import { Component, Input } from '@angular/core';

@Component({
  selector: 'web-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
  @Input() buttonTitle: string = 'button';
}
