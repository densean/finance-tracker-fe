import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'web-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.less'],
})
export class BillsListComponent {
  @Input() options: any[] = [];
  @Input() lists: any[] = [];
  @Input() initSelectedBills: string = '';
}
