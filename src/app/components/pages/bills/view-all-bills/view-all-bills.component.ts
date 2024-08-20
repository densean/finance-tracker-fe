import { Component } from '@angular/core';
import { MONTHS } from '../../expenses/expenses-by-date/expenses-by-date.component.constants';
import { IViewAllBillRequest } from './view-all-bills.component.interface';
import { IBillDisplay } from '../bills.component.interface';

@Component({
  selector: 'app-view-all-bills',
  templateUrl: './view-all-bills.component.html',
  styleUrls: ['./view-all-bills.component.less'],
})
export class ViewAllBillsComponent {
  months: string[] = MONTHS;
  initialDate: Date = new Date();
  initialYear: number = new Date().getFullYear();
  initialMonth: number = new Date().getMonth();
  yearLimit: number = 3;
  selectedYear: number = this.initialYear;
  selectedMonth: number = this.initialMonth;
  minYear: number = this.initialYear - this.yearLimit;
  maxYear: number = this.initialYear + this.yearLimit;
  billsByMonthRequest: IViewAllBillRequest = { month: 0, year: 0 };
  displayedBills = [];
  displayedBillsAPI = [];
  menuItems = [
    { name: 'Upcoming Bills', icon: 'pi pi-calendar' },
    { name: 'Overdue Bills', icon: 'pi pi-exclamation-triangle' },
    { name: 'Paid Bills', icon: 'pi pi-check' },
  ];
  initialItem = this.menuItems[0];
  sampleBill: IBillDisplay = {
    name: 'Laptop',
    amount: 3400,
    occurrence: 1,
    term: 18,
    id: '14102155',
    notes: '',
    isPaid: false,
    dueDate: new Date('08-25-2024'),
  };

  ngOnInit() {
    this.initBillCards();
  }

  initBillCards() {
    this.billsByMonthRequest = {
      month: this.selectedMonth,
      year: this.selectedYear,
    };

    //service.getBillsByMonth(this.billsByMonthRequest) { displayedBillsAPI = response}
  }

  updateSelectedMonth() {
    this.initBillCards();
  }

  isPreviousYearDisabled(): boolean {
    return this.selectedYear <= this.minYear;
  }

  isNextYearDisabled(): boolean {
    return this.selectedYear >= this.maxYear;
  }

  goToPreviousYear() {
    if (!this.isPreviousYearDisabled()) {
      this.selectedYear--;
    }

    this.initBillCards();
  }

  goToNextYear() {
    if (!this.isNextYearDisabled()) {
      this.selectedYear++;
    }
    this.initBillCards();
  }
}
