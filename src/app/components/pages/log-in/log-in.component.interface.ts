export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: Date;
  password: string;
  roles: [];
}
