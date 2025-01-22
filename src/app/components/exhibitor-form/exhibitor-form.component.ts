import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-exhibitor-form',
  imports: [],
  templateUrl: './exhibitor-form.component.html',
  styleUrl: './exhibitor-form.component.scss',
})
export class ExhibitorFormComponent {
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  handleRemove() {
    this.remove.emit(this.index);
  }
}
