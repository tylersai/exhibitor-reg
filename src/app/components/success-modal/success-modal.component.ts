import { Component, EventEmitter, Input, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveDataUrlAsImage } from '../../../utils/helper';

@Component({
  selector: 'app-success-modal',
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  @Input() groupRegCode: string = '';
  @Output() closeModal = new EventEmitter();

  handleSaveAsImage() {
    const canvasEl = document.getElementById('code-canvas');
    if (canvasEl) {
      html2canvas(canvasEl).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        saveDataUrlAsImage(dataUrl, `${this.groupRegCode}.png`);
      });
    }
  }
}
