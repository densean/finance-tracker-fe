import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'web-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less'],
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
