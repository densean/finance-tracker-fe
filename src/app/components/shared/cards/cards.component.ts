import { Component, Input } from '@angular/core';

@Component({
  selector: 'web-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less'],
})
export class CardsComponent {
  @Input() cardHeaderTitle: string = '';
}
