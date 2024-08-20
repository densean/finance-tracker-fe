import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'web-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
})
export class InputComponent implements OnInit {
  @Input() inputType: string = '';
  @Input() inputTitle: string = '';
  @Input() inputDescription: string = '';
  @Input() controlName: FormControl = new FormControl();
  @Input() errorMessage: string = '';
  @Input() inputPlaceHolder: string = '';
  @Output() valueChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onKeyDown(event: KeyboardEvent) {
    this.valueChange.emit(event?.target);
  }
}
