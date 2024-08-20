import { Component, Input, OnInit } from '@angular/core';
import { IBillDisplay } from '../../bills.component.interface';

@Component({
  selector: 'web-bills-cards',
  templateUrl: './bills-cards.component.html',
  styleUrls: ['./bills-cards.component.less'],
})
export class BillsCardsComponent implements OnInit {
  @Input() bills: IBillDisplay = {
    id: '',
    name: '',
    term: 0,
    occurrence: 0,
    amount: 0,
    notes: '',
    dueDate: new Date(),
    isPaid: false,
  };
  numberOfPaidBills = 2;
  widthFill = 0;
  widthFillInPercentage = '';

  ngOnInit() {
    this.widthFill = (this.numberOfPaidBills / this.bills.term) * 100;
    this.widthFillInPercentage = `${this.widthFill}%`;
    console.log(this.widthFillInPercentage);
  }
}
