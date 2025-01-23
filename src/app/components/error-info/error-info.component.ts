import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-info',
  imports: [],
  templateUrl: './error-info.component.html',
  styleUrl: './error-info.component.scss',
})
export class ErrorInfoComponent {
  @Input() totalCount = 0;
  @Input() failCount = 0;
}
