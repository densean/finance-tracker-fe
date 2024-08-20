import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap(({ user }) =>
        this.authService.loginUser(user).pipe(
          map((response) => {
            const decodedJwt: any = jwtDecode(response.access_token);
            const encryptedRole = btoa(decodedJwt?.roles[0]);
            localStorage.setItem('token', response.access_token);
            this.cookieService.set('WEB_ROLE', encryptedRole, {
              path: '/',
              secure: true,
              sameSite: 'Strict',
            });

            return AuthActions.loginSuccess({
              token: response.token,
              user: response.user,
            });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error: error })))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );
}
