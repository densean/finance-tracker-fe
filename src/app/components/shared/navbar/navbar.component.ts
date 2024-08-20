import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AUTH_ROLES } from 'src/app/core/auth/auth.constants';
import { AuthService } from 'src/app/core/auth/auth.service';
import { logout } from 'src/app/core/auth/store/auth.actions';

@Component({
  selector: 'web-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Expenses',
        icon: 'pi pi-building-columns',
        items: [
          {
            label: 'Add Expenses',
            icon: 'pi pi-plus',
            routerLink: '/expenses/add-expenses',
          },
          {
            label: 'View Expenses by Date',
            icon: 'pi pi-calendar-plus',
            routerLink: '/expenses/view-expenses-by-date',
          },
        ],
      },
      {
        label: 'Bills',
        icon: 'pi pi-credit-card',
        items: [
          {
            label: 'Add Bills',
            icon: 'pi pi-plus',
            routerLink: '/bills/add-bills',
          },
          {
            label: 'View All Bills',
            icon: 'pi pi-receipt',
            routerLink: '/bills/view-all-bills',
          },
        ],
      },
      {
        label: 'View Reports',
        icon: 'pi pi-chart-bar',
        items: [{ label: 'Expenses' }],
      },
      {
        label: 'User',
        icon: 'pi pi-user',
        items: [
          {
            label: 'User details',
            icon: 'pi pi-user-edit',
            routerLink: '/user',
          },
          // {
          //   label: 'Employer details',
          //   icon: 'pi pi-briefcase',
          // },
          {
            label: 'QR Codes',
            icon: 'pi pi-file',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.store.dispatch(logout()),
          },
        ],
      },
    ];

    if (this.authService.getRole()?.includes(AUTH_ROLES[1])) {
      const userLabel = this.items[this.items.length - 1];
      this.items.pop();
      this.items.push(
        {
          label: 'Admin',
          icon: 'pi pi-shield',
          // routerLink: '/admin',
          items: [
            {
              label: 'Users management',
              icon: 'pi pi-users',
            },
            {
              label: 'User-Role management',
              icon: 'pi pi-book',
            },
            {
              label: 'All expenses list',
              icon: 'pi pi-wallet',
            },
          ],
        },
        userLabel
      );
    }
  }
}
