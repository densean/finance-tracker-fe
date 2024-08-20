import { IError } from '../models/error.interface';
import { IPublicUser } from '../models/user.interface';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  user: IPublicUser | null;
  error: IError | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  user: null,
  error: null,
};
