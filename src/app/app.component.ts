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
import { Exhibitor, ExhibitorPayload } from '../types';
import { catchError, throwError } from 'rxjs';

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
  events: string[] = [];
  companies: string[] = [];
  companiesByEvent: Record<string, string[]> = {};
  selectedEvent: string = '';
  selectedCompany: string = '';

  exhibitorsForm: FormGroup;

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
        this.events = Object.keys(grouped);
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
    this.companies = this.companiesByEvent[event];
    this.selectedCompany = '';
  }

  handleSelectCompany(company: string) {
    this.selectedCompany = company;
  }

  submitForm() {
    console.log(this.exhibitorsForm.valid);
    console.log(this.exhibitorsForm.errors);
    console.log(this.exhibitorsForm.getRawValue());
    if (this.exhibitorsForm.valid) {
      const persons: Exhibitor[] = this.persons.getRawValue();
      const payloads: ExhibitorPayload[] = persons.map<ExhibitorPayload>(
        (p) => {
          return {
            S_added_via: 'Web Form',
            S_company: this.selectedCompany,
            S_email_address: p.email,
            S_group_reg_id: 'ESVTE',
            S_name_on_badge: p.name,
            S_job_title: p.job,
            S_country: p.country,
            S_company_on_badge: p.company,
            SB_event_fha: this.selectedCompany === 'FHA-Food & Beverage',
            SB_event_prowine: this.selectedCompany === 'Prowine Singapore',
          };
        }
      );

      payloads.forEach((payload) => {
        this.registrationService
          .register(payload)
          .pipe(
            catchError((err) => {
              console.log('caught mapping error and rethrowing', err);
              return throwError(() => new Error(err));
            })
          )
          .subscribe(({ status, message: data }) => {
            console.log({ status, data });
          });
      });
    }
  }
}
