import { Component, Input } from '@angular/core';

@Component({
  selector: 'web-empty-resources',
  templateUrl: './empty-resources.component.html',
  styleUrls: ['./empty-resources.component.less'],
})
export class EmptyResourcesComponent {
  @Input() emptyResourcesMessage: string = '';
  @Input() emptyResourcesSubMessage: string = '';
}
