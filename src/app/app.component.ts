import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { CompanyService } from './services/company.service';
import { CompanySelectComponent } from './components/company-select/company-select.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerComponent, CompanySelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  events: string[] = [];
  companies: string[] = [];
  companiesByEvent: Record<string, string[]> = {};
  selectedEvent: string = '';
  selectedCompany: string = '';

  constructor(private companyService: CompanyService) {}

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
        }, {});
        this.companiesByEvent = grouped;
        this.events = Object.keys(grouped);
      }
    });
  }

  handleSelectEvent(event: string) {
    this.selectedEvent = event;
    this.companies = this.companiesByEvent[event];
    this.selectedCompany = '';
  }

  handleSelectCompany(company: string) {
    this.selectedCompany = company;
  }
}
