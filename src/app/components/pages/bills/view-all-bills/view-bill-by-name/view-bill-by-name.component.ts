import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { IBillDisplay } from '../../bills.component.interface';

@Component({
  selector: 'web-view-bill-by-name',
  templateUrl: './view-bill-by-name.component.html',
  styleUrls: ['./view-bill-by-name.component.less'],
})
export class ViewBillByNameComponent implements OnChanges {
  @Input() bills: IBillDisplay[] = [];
  widthFillInPercentage: string = '';
  paidBills: number = 0;

  ngOnChanges(): void {
    this.getNumberOfPaidBills();
    this.updateFillPercentage();
  }

  getNumberOfPaidBills(): void {
    this.paidBills = this.bills.filter((bill) => bill.isPaid).length;
  }

  updateFillPercentage(): void {
    const widthFill = (this.paidBills / this.bills.length) * 100;
    this.widthFillInPercentage = `${widthFill}%`;
  }
}
