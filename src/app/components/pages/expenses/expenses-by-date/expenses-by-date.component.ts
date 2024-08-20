import { Component, OnInit } from '@angular/core';
import { MONTHS } from './expenses-by-date.component.constants';
import { EXPENSES_BY_DATE_API } from './expenses-by-date.mock';
import {
  IExpensesByDay,
  IExpensesByDayRequest,
} from './expenses-by-date.component.interface';

@Component({
  selector: 'app-expenses-by-date',
  templateUrl: './expenses-by-date.component.html',
  styleUrls: ['./expenses-by-date.component.less'],
})
export class ExpensesByDateComponent implements OnInit {
  months: string[] = MONTHS;
  initialYear: number = new Date().getFullYear();
  initialMonth: number = new Date().getMonth();
  yearLimit: number = 3;
  selectedYear: number = this.initialYear;
  selectedMonth: number = this.initialMonth;
  minYear: number = this.initialYear - this.yearLimit;
  maxYear: number = this.initialYear + this.yearLimit;
  expensesAPI: IExpensesByDay[] = EXPENSES_BY_DATE_API;
  selectedDate: Date = new Date();
  displayDates: Date[] = [];
  displayDatesExpenses: IExpensesByDay[][] = [[]];
  expenseByMonthRequest: IExpensesByDayRequest = { month: 0, year: 0 };

  ngOnInit() {
    this.initDisplayDates();
  }

  initDisplayDates() {
    //service call
    this.expenseByMonthRequest = {
      month: this.selectedMonth,
      year: this.selectedYear,
    };

    if (this.selectedMonth == 7 && this.selectedYear == 2024) {
      this.expensesAPI = EXPENSES_BY_DATE_API;
    } else this.expensesAPI = [];

    this.updateDisplayedDates();
    this.updateDisplayedExpenses();
  }

  updateDisplayedDates() {
    this.displayDates = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date(this.selectedDate);
      date.setDate(this.selectedDate.getDate() + i);
      this.displayDates.push(date);
    }
  }

  updateDisplayedExpenses() {
    this.displayDatesExpenses = this.displayDates.map((date) =>
      this.expensesAPI.filter((expense) => this.isSameDay(expense.date, date))
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  getTotalForExpenses(expenses: IExpensesByDay[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  goToPreviousDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.updateDisplayedDates();
    this.updateDisplayedExpenses();
  }

  goToNextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.updateDisplayedDates();
    this.updateDisplayedExpenses();
  }

  isPreviousDayDisabled(): boolean {
    return this.selectedDate.getDate() === 1;
  }

  isNextDayDisabled(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      0
    );

    if (this.selectedDate.getDate() === lastDayOfMonth.getDate()) {
      return true;
    }

    if (this.selectedDate.getTime() >= today.getTime()) {
      return true;
    }

    return false;
  }

  updateSelectedMonth() {
    this.initDisplayDates();
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

    this.initDisplayDates();
  }

  goToNextYear() {
    if (!this.isNextYearDisabled()) {
      this.selectedYear++;
    }
    this.initDisplayDates();
  }

  determineCategoryIcon(category: string): string {
    switch (category) {
      case 'Food':
        return 'restaurant_menu';
      case 'Transportation':
        return 'commute';
      case 'Grocery':
        return 'local_grocery_store';
      case 'Bills':
        return 'credit_card';
      case 'Drinks':
        return 'local_cafe';
      case 'Gas':
        return 'local_gas_station';
      case 'Medical':
      case 'Health':
        return 'local_hospital';
      case 'Shopping':
        return 'local_offer';
      case 'Flight':
        return 'flight_takeoff';
      case 'Gaming':
        return 'videogame_asset';
      case 'Electronics':
        return 'phone_iphone';
      case 'Entertainment':
        return 'theaters';
      default:
        return 'help_outline';
    }
  }
}
