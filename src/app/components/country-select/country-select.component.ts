import { NgFor, NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [NgIf, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true,
    },
  ],
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent {
  @Input() options: string[] = [];
  selectedValue: string = '';
  dropdownOpen: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  toggleDropdown() {
    if (this.options.length > 0) {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }

  selectOption(option: string) {
    this.selectedValue = option;
    this.onChange(option);
    this.onTouched();
    this.dropdownOpen = false;
  }

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
