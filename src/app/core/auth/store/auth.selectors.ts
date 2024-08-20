import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = (state: any) => state.auth;

export const isAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const user = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
