import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'web-input-with-dropdown',
  templateUrl: './input-with-dropdown.component.html',
  styleUrls: ['./input-with-dropdown.component.less'],
})
export class InputWithDropdownComponent {
  @Input() inputType: string = '';
  @Input() inputTitle: string = '';
  @Input() inputDescription: string = '';
  @Input() controlName: FormControl = new FormControl();
  @Input() dropDownControlName: FormControl = new FormControl();
  @Input() inputPlaceHolder: string = '';
  @Input() dropDownPlaceHolder: string = '';
  @Input() dropDownDescription: string = '';
  @Input() dropDownOptions: object[] = [];
  @Input() placeholderLabel: string = '';
  @Input() errorMessage: string = '';

  isFocused = false;

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
