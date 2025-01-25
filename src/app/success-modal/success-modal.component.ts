import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  @Input() groupRegCode: string = '';
  @Output() saveAsImage = new EventEmitter();
  @Output() closeModal = new EventEmitter();
}
