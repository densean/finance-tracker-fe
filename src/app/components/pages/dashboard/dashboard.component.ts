import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  IDashboardBills,
  IDashboardExpenses,
  IDashboardReportCards,
} from './dashboard.component.interface';
import { IBillDisplay } from '../bills/bills.component.interface';
// import { DashboardService } from 'src/app/core/pages/dashboard.service';
// import { IExpensesDashboardRequest } from 'src/app/core/pages/models/dashboard.interface';
import { DashboardService } from 'src/app/core/pages/dashboard/dashboard.service';
import { IExpensesDashboardRequest } from 'src/app/core/pages/dashboard/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  itemsArray: MenuItem[] = [];
  bills: IDashboardBills[] = [
    { name: 'rent', amount: 1200, date: new Date('2024-01-05') },
    { name: 'groceries', amount: 250, date: new Date('2024-01-10') },
    { name: 'utilities', amount: 150, date: new Date('2024-02-15') },
    { name: 'entertainment', amount: 80, date: new Date('2024-03-22') },
    { name: 'transport', amount: 60, date: new Date('2024-04-10') },
    { name: 'salary', amount: 3000, date: new Date('2024-05-01') },
    { name: 'gift', amount: 200, date: new Date('2024-06-20') },
    { name: 'misc', amount: 75, date: new Date('2024-07-25') },
  ];

  expenses: IDashboardExpenses[] = [
    {
      name: 'Lunch at Café',
      category: 'Food',
      date: new Date('2024-08-05'),
      amount: 20,
    },
    {
      name: 'Bus Ticket',
      category: 'Transportation',
      date: new Date('2024-08-06'),
      amount: 2.5,
    },
    {
      name: 'Grocery Shopping',
      category: 'Grocery',
      date: new Date('2024-08-07'),
      amount: 150,
    },
    {
      name: 'Electricity Bill',
      category: 'Bills',
      date: new Date('2024-08-08'),
      amount: 120,
    },
    {
      name: 'Dinner at Pub',
      category: 'Food',
      date: new Date('2024-08-09'),
      amount: 45,
    },
    {
      name: 'Taxi Fare',
      category: 'Transportation',
      date: new Date('2024-08-10'),
      amount: 30,
    },
    {
      name: 'Weekly Groceries',
      category: 'Grocery',
      date: new Date('2024-08-11'),
      amount: 80,
    },
    {
      name: 'Internet Bill',
      category: 'Bills',
      date: new Date('2024-08-12'),
      amount: 60,
    },
    {
      name: 'Coffee Shop',
      category: 'Drinks',
      date: new Date('2024-08-13'),
      amount: 5,
    },
    {
      name: 'Gas Station',
      category: 'Gas',
      date: new Date('2024-08-14'),
      amount: 50,
    },
    {
      name: 'Doctor Visit',
      category: 'Medical',
      date: new Date('2024-08-15'),
      amount: 200,
    },
    {
      name: 'New Shoes',
      category: 'Shopping',
      date: new Date('2024-08-16'),
      amount: 90,
    },
    {
      name: 'Flight Ticket',
      category: 'Flight',
      date: new Date('2024-08-17'),
      amount: 500,
    },
    {
      name: 'Video Game Purchase',
      category: 'Gaming',
      date: new Date('2024-08-18'),
      amount: 60,
    },
    {
      name: 'Phone Repair',
      category: 'Electronics',
      date: new Date('2024-08-19'),
      amount: 120,
    },
    {
      name: 'Movie Night',
      category: 'Entertainment',
      date: new Date('2024-08-20'),
      amount: 30,
    },
    {
      name: 'Dinner with Friends',
      category: 'Food',
      date: new Date('2024-08-21'),
      amount: 70,
    },
    {
      name: 'Metro Pass',
      category: 'Transportation',
      date: new Date('2024-08-22'),
      amount: 15,
    },
    {
      name: 'Household Items',
      category: 'Grocery',
      date: new Date('2024-08-23'),
      amount: 50,
    },
    {
      name: 'Credit Card Payment',
      category: 'Bills',
      date: new Date('2024-08-24'),
      amount: 150,
    },
    {
      name: 'Barbecue Drinks',
      category: 'Drinks',
      date: new Date('2024-08-25'),
      amount: 25,
    },
  ];
  dailySummary: IDashboardReportCards = { category: 'Food', amount: 1000 };
  weeklySummary: IDashboardReportCards = {
    category: 'Transportation',
    amount: 2000,
  };
  monthlySummary: IDashboardReportCards = { category: 'Bills', amount: 10000 };

  expensesTableScrollHeight = '48.8vh';
  expensesTableRows = 15;
  billDisplay: IDashboardBills[] = [];

  constructor(
    private datePipe: DatePipe,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    let paginationRequest: IExpensesDashboardRequest = {
      pageNo: 0,
      pageSize: 20,
    };
    this.dashboardService
      .getExpenses(4, paginationRequest)
      .subscribe((response) => {
        console.log(response);
      });

    this.renderBillDisplays();
  }

  renderBillDisplays() {
    this.bills.slice(0, 7).forEach((bill) => {
      // const formattedDate = this.datePipe.transform(bill.date, 'MMM dd yyyy');
      this.billDisplay.push({
        name: bill.name.charAt(0).toUpperCase() + bill.name.slice(1),
        amount: bill.amount,
        date: bill.date,
      });
    });
  }

  determineCategoryIcon(category: string): string {
    switch (category) {
      case 'Food':
        return 'restaurant_menu';
      case 'Transportation':
        return 'directions_car';
      case 'Grocery':
        return 'local_grocery_store';
      case 'Bills':
        return 'credit_card';
      case 'Drinks':
        return 'local_cafe';
      case 'Gas':
        return 'local_gas_station';
      case 'Medical':
        return 'local_hospital';
      case 'Shopping':
        return 'local_offer';
      case 'Flight':
        return 'flight';
      case 'Gaming':
        return 'videogame_asset';
      case 'Electronics':
        return 'phone_iphone';
      default:
        return 'help_outline';
    }
  }
}
