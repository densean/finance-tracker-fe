import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'web-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
})
export class CalendarComponent {
  @Input() inputTitle: string = '';
  @Input() controlName: FormControl = new FormControl();
  @Input() errorMessage: string = '';
  @Input() calendarPlaceHolder: string = '';
}
