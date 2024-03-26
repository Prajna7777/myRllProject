import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// import * as $ from 'jquery';
import $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { localStorageSession } from '../../shared/localStorage';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showPassword: boolean = true;
  subHeader: string = 'Login';
  IsForgetPassword: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _authService: AuthenticationService,
    private _localStorage: localStorageSession,
    private spinner: NgxSpinnerService
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleSubmit(loginForm: NgForm) {
    this.handleValidation();
    if (loginForm.valid) {
      console.log('Acceptable');
      let _data = {
        email: $('#email').val()?.toString().trim(),
        password: $('#password').val(),
      };
      // SPINNER VISIBLE
      this.spinner.show();
      this._authService.SignIn(_data).subscribe({
        next: (result: any) => {
          
          if (!this.IsForgetPassword) {
            console.log('Sign In Result : ', result.token);
            this.openSnackBar('Sign In Successfully');

            if (result.user.role === 'ADMIN') {
              this._localStorage.setItem('Admin-Id', result.user.userId);
              this._localStorage.setItem('Admin-Token', result.token);
              this._localStorage.setItem('Common-Token', result.token);
              this._localStorage.setItem('Admin-Email', result.user.email);
              window.location.href = 'admindashboard/home';
            } else {
              this._localStorage.setItem('User-Id', result.user.userId);
              this._localStorage.setItem('User-Token', result.token);
              this._localStorage.setItem('Common-Token', result.token);
              this._localStorage.setItem('User-Email', result.user.email);
              window.location.href = 'userdashboard/home';
            }

            // SPINNER HIDE
            this.spinner.hide();
          } else {
            // SPINNER HIDE
            this.spinner.hide();
            this.openSnackBar(result.message);
            this.IsForgetPassword = false;
          }
        },
        error: (error) => {
          this.spinner.hide();
          console.log('Sign In Error : ', error);
          this.openSnackBar('Something went wrong');
        },
      });
    } else {
      this.openSnackBar('Please Enter Required Field');
    }
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  handleValidation() {
    $('#emailHelp').hide();
    $('#passwordHelp').hide();
    console.log('email : ', $('#email').val());
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }
    console.log('password : ', $('#password').val());
    if ($('#password').val() === '') {
      $('#passwordHelp').show();
    }
  }

  handleNevigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  handleForgetPassword() {
    this.router.navigate(['/resetpassword']);
  }
}
