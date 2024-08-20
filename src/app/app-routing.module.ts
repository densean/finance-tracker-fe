import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LogInComponent } from './components/pages/log-in/log-in.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { AuthService } from './core/auth/auth.service';
import { LoginAuthGuard } from './core/auth/login-authguard.service';
import { AdminHomeComponent } from './components/pages/admin-home/admin-home.component';
import { AdminAuthGuard } from './core/auth/admin-authguard.service';
import { ExpensesComponent } from './components/pages/expenses/expenses.component';
import { BillsComponent } from './components/pages/bills/bills.component';
import { UserDetailsComponent } from './components/pages/user-details/user-details.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { ExpensesByDateComponent } from './components/pages/expenses/expenses-by-date/expenses-by-date.component';
import { ViewAllBillsComponent } from './components/pages/bills/view-all-bills/view-all-bills.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'expenses/add-expenses',
    component: ExpensesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses/view-expenses-by-date',
    component: ExpensesByDateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/add-bills',
    component: BillsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/view-all-bills',
    component: ViewAllBillsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
