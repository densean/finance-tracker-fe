import { createAction, props } from '@ngrx/store';
import { ILoginRequest } from 'src/app/components/pages/log-in/log-in.component.interface';
import { IPublicUser } from '../models/user.interface';
import { IError } from '../models/error.interface';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ user: ILoginRequest }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: IPublicUser }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: IError }>()
);
export const logout = createAction('[Auth] Logout');
