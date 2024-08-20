import { Component, OnInit } from '@angular/core';
import {
  FORM_CONTROL_NAMES,
  LOGIN_INPUT_DETAILS,
  ERROR_MESSAGES,
} from './log-in.constants';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ILoginRequest, ISignUpRequest } from './log-in.component.interface';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../core/auth/store/auth.actions';
import { UserService } from 'src/app/core/auth/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.less'],
})
export class LogInComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  inputDetails = LOGIN_INPUT_DETAILS;
  isLogin: boolean = true;
  formControlNames = FORM_CONTROL_NAMES;
  errorMessage = ERROR_MESSAGES;
  modalVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private store: Store
  ) {}

  loginForm = new FormGroup({
    loginUsername: new FormControl('', [Validators.required]),
    loginPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator,
    ]),
  });

  ngOnInit(): void {}

  onInputKeyUp(event: any) {
    console.log(event.value);
  }

  onAnchorClicked() {
    this.isLogin = !this.isLogin;
  }

  onUserLogin() {
    let loginRequest: ILoginRequest = { username: '', password: '' };
    loginRequest.username = this.getLoginFormValue('loginUsername');
    loginRequest.password = this.getLoginFormValue('loginPassword');

    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.loginRequest({ user: loginRequest }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onUserSignUp() {
    let signUpRequest: ISignUpRequest = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      dob: new Date(),
      password: '',
      roles: [],
    };
    signUpRequest.firstName = this.getSignUpFormValue('firstName');
    signUpRequest.lastName = this.getSignUpFormValue('lastName');
    signUpRequest.email = this.getSignUpFormValue('email');
    signUpRequest.dob = this.getSignUpFormValue('dob');
    signUpRequest.username = this.getSignUpFormValue('username');
    signUpRequest.password = this.getSignUpFormValue('password');

    if (this.signUpForm.valid) {
      this.userService
        .signUp(signUpRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            this.modalVisible = !this.modalVisible;
          },
          (error) => {
            console.error('Error during sign up:', error);
          }
        );
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDialogClose() {
    this.isLogin = !this.isLogin;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (control && control.parent) {
      const password = control.parent.get('password');
      const confirmPassword = control.parent.get('confirmPassword');
      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        return { mismatch: true };
      }
    }
    return null;
  }

  getLoginFormValue(formControlName: string) {
    return this.loginForm.get(formControlName)?.value;
  }

  getSignUpFormValue(formControlName: string) {
    return this.signUpForm.get(formControlName)?.value;
  }

  getLoginErrorMessage(formControlName: keyof typeof this.errorMessage) {
    if (!(formControlName in this.formControlNames)) {
      return 'Error';
    }

    const control = this.loginForm.get(formControlName);

    if (control?.hasError('required')) {
      return this.errorMessage[formControlName];
    }

    return this.errorMessage.default;
  }

  getSignUpErrorMessage(formControlName: keyof typeof this.errorMessage) {
    if (!(formControlName in this.formControlNames)) {
      return 'Error';
    }

    const control = this.signUpForm.get(formControlName);

    if (control?.hasError('required')) {
      return this.errorMessage[formControlName];
    } else if (control?.hasError('email')) {
      return this.errorMessage.invalidEmail;
    } else if (control?.hasError('mismatch')) {
      return this.errorMessage.invalidConfirmPassword;
    }

    return this.errorMessage.default;
  }
}
