import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exhibitor-form',
  imports: [ReactiveFormsModule],
  templateUrl: './exhibitor-form.component.html',
  styleUrl: './exhibitor-form.component.scss',
})
export class ExhibitorFormComponent {
  @Input() person!: AbstractControl;
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  handleRemove() {
    this.remove.emit(this.index);
  }
}
