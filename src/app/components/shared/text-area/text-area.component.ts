import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'web-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.less'],
})
export class TextAreaComponent {
  @Input() inputTitle: string = '';
  @Input() textAreaDescription: string = '';
  @Input() controlName: FormControl = new FormControl();
  @Input() errorMessage: string = '';
  @Input() textAreaPlaceholder: string = '';
}
