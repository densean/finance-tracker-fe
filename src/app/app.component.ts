import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'finance-tracker-app';
  isComponentVisible: boolean = true;
  private subscription: Subscription = new Subscription();
  private unsubscribe: Subject<void> = new Subject<void>();
  navbarVisibleRoutes: string[] = [
    '/dashboard',
    '/admin',
    '/expenses/add-expenses',
    '/expenses/view-expenses-by-date',
    '/bills/add-bills',
    '/bills/view-all-bills',
    '/user',
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this.unsubscribe)
        )
        .subscribe(() => {
          this.processComponentVisibility();
        })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  processComponentVisibility() {
    const currentUrl = this.router.url;
    this.isComponentVisible = this.isValidRoute(currentUrl);
  }

  isValidRoute(url: string): boolean {
    // Normalize the URL to remove query parameters and fragments
    const normalizedUrl = url.split('?')[0].split('#')[0];
    return (
      this.navbarVisibleRoutes.includes(normalizedUrl) || normalizedUrl === '/'
    );
  }
}
