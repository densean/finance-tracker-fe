import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import { AuthState } from './store/auth.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginRequest } from 'src/app/components/pages/log-in/log-in.component.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginApi: string = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  loginUser(request: ILoginRequest): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', request.username);
    body.set('password', request.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<any>(this.loginApi, body.toString(), { headers });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return atob(this.cookieService.get('WEB_ROLE'));
  }
}
