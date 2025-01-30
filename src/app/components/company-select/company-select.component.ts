import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-company-select',
  imports: [CustomSelectComponent],
  templateUrl: './company-select.component.html',
  styleUrl: './company-select.component.scss',
})
export class CompanySelectComponent {
  @Input() isLoading: boolean = false;
  @Input() events: string[] = [];
  @Input() companies: string[] = [];
  @Input() selectedEvent: string = '';
  @Input() selectedCompany: string = '';
  @Output() selectEvent = new EventEmitter<string>();
  @Output() selectCompany = new EventEmitter<string>();

  handleSelectEvent(event: string) {
    this.selectEvent.emit(event);
  }

  handleSelectCompany(event: Event) {
    this.selectCompany.emit((event.target as HTMLSelectElement).value);
  }
}
