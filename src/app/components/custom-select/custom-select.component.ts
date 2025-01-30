import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [NgIf, NgFor],
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedValue: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  dropdownOpen: boolean = false;

  toggleDropdown() {
    if (this.options.length > 0) {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }

  selectOption(option: string) {
    this.selectionChange.emit(option);
    this.dropdownOpen = false;
  }
}
