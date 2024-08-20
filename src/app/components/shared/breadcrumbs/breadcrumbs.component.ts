import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription, interval } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'web-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  home: MenuItem = {};
  private unsubscribe$: Subject<void> = new Subject<void>();
  currentTime: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/', label: 'Dashboard' };

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.items = this.processBreadcrumbsItems();
      });

    this.items = this.processBreadcrumbsItems();

    interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.currentTime = new Date();
      });
  }

  ngOnDestroy() {
    // Complete the Subject to trigger the unsubscribe process
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  processBreadcrumbsItems(): MenuItem[] {
    const path = window.location.pathname;
    const parts = path.split('/');
    const pathItems: MenuItem[] = [];
    parts.forEach((part) => {
      if (part && part !== 'dashboard') {
        const label = part
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        pathItems.push({ label: label });
      }
    });
    return pathItems;
  }
}
