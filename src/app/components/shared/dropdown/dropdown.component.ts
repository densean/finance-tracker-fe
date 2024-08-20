import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'web-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
})
export class DropdownComponent {
  @Input() inputTitle: string = '';
  @Input() dropDownDescription: string = '';
  @Input() controlName: FormControl = new FormControl();
  @Input() errorMessage: string = '';
  @Input() dropDownOptions: object[] = [];
  @Input() placeholderLabel: string = '';
  @Input() defaultValue: string = '';
}
