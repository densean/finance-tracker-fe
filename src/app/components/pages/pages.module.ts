import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponentsModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ExpensesComponent } from './expenses/expenses.component';
import { BillsComponent } from './bills/bills.component';
import { UserDetailsComponent } from './user-details/user-details.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExpensesByDateComponent } from './expenses/expenses-by-date/expenses-by-date.component';
import { ViewAllBillsComponent } from './bills/view-all-bills/view-all-bills.component';
// import {provideNativeDateAdapter} from '@angular/material/core';
// import { MatNativeDateModule } from '@angular/material/core';
import { ListboxModule } from 'primeng/listbox';
import { BillsListComponent } from './bills/view-all-bills/bills-list/bills-list.component';
import { BillsCardsComponent } from './bills/view-all-bills/bills-cards/bills-cards.component';

@NgModule({
  declarations: [
    LogInComponent,
    DashboardComponent,
    AdminHomeComponent,
    ExpensesComponent,
    BillsComponent,
    UserDetailsComponent,
    ErrorPageComponent,
    ExpensesByDateComponent,
    ViewAllBillsComponent,
    BillsListComponent,
    BillsCardsComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    PanelModule,
    CalendarModule,
    ListboxModule,
    // MatDatepickerModule,
    CardModule,
    // MatNativeDateModule,
  ],
  providers: [DatePipe],
})
export class PagesModule {}
