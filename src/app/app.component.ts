import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { CompanyService } from './services/company.service';
import { CompanySelectComponent } from './components/company-select/company-select.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { RegistrationService } from './services/registration.service';
import { Exhibitor, ExhibitorPayload, FailureStats } from '../types';
import { EventType } from '../utils/constant';
import { generateRandomCode } from '../utils/helper';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    BannerComponent,
    CompanySelectComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  groupRegCode: string = '';

  events: string[] = [EventType.FHA, EventType.PROWINE];
  companies: string[] = [];
  companiesByEvent: Record<string, string[]> = {};
  selectedEvent: string = '';
  selectedCompany: string = '';

  exhibitorsForm: FormGroup;

  isProcessing: boolean = false;
  failureStats: FailureStats | null = null;

  constructor(
    private companyService: CompanyService,
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {
    this.exhibitorsForm = this.fb.group({
      persons: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.groupRegCode = generateRandomCode();
    this.companyService.getList().subscribe(({ status, message: data }) => {
      if (status) {
        const grouped: Record<string, string[]> = {};
        data.forEach((el) => {
          if (grouped[el.S_event]) {
            grouped[el.S_event].push(el.S_company);
          } else {
            grouped[el.S_event] = [el.S_company];
          }
        });
        this.companiesByEvent = grouped;
      }
    });
    this.addPerson();
  }

  get persons() {
    return this.exhibitorsForm.get('persons') as FormArray;
  }

  addPerson(): void {
    const person = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      job: ['', Validators.required],
      country: ['', Validators.required],
      company: ['', Validators.required],
    });
    this.persons.push(person);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  handleSelectEvent(event: string) {
    this.selectedEvent = event;
    this.companies = this.companiesByEvent[event] || [];
    this.selectedCompany = '';
  }

  handleSelectCompany(company: string) {
    this.selectedCompany = company;
  }

  private resetAll() {
    this.selectedEvent = '';
    this.selectedCompany = '';
    this.companies = [];
    this.persons.clear();
    this.addPerson();
  }

  private mapExhibitorPayload(person: Exhibitor): ExhibitorPayload {
    const { name, email, job, country, company } = person;
    return {
      S_added_via: 'Web Form',
      S_company: this.selectedCompany,
      S_email_address: email,
      S_group_reg_id: this.groupRegCode,
      S_name_on_badge: name,
      S_job_title: job,
      S_country: country,
      S_company_on_badge: company,
      SB_event_fha: this.selectedEvent === EventType.FHA,
      SB_event_prowine: this.selectedEvent === EventType.PROWINE,
    };
  }

  async processRegister() {
    const persons: Exhibitor[] = this.persons.getRawValue();
    if (persons.length > 0 && this.exhibitorsForm.valid) {
      const payloads = persons.map((p) => this.mapExhibitorPayload(p));
      this.failureStats = null;
      this.isProcessing = true;
      const results = await this.registrationService.registerAll(payloads);
      this.isProcessing = false;
      const allSuccess = !results.some((rs) => rs.status === 'rejected');
      if (allSuccess) {
        alert('show modal here');
        this.resetAll();
      } else {
        let failCount = 0;
        let errors: Array<{ originalIndex: number; message: string }> = [];
        results.forEach((rs, ind) => {
          if (rs.status === 'rejected') {
            failCount++;
            errors.push({
              originalIndex: ind,
              message: rs.reason.message,
            });
          } else {
            this.persons.removeAt(ind);
          }
        });
        this.failureStats = {
          totalCount: results.length,
          failCount,
          errors,
        };
      }
    } else {
      this.exhibitorsForm.markAllAsTouched();
    }
  }
}
