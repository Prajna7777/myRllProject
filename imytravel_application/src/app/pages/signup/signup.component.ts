import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showPassword: boolean = false;
  role = 'USER';
  constructor(
    // public toastr: ToastrService,
    private _authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleSubmit(registrationForm: NgForm) {
    console.log('Registration Form : ', registrationForm);
    this.handleValidation();

    if (registrationForm.valid) {
      if (
        $('#confirmPassword').val()?.toString() !==
        $('#password').val()?.toString()
      ) {
        this.openSnackBar('Password & Confirm Password Not Match');
        return;
      }

      let _data = {
        email: $('#email').val()?.toString().trim(),
        password: $('#password').val()?.toString(),
        role: this.role.toUpperCase(),
      };

      // SPINNER VISIBLE
      this.spinner.show();
      this._authService.SignUp(_data).subscribe(
        (result: any) => {
          console.log('Sign Up Result : ', result);
          this.spinner.hide();
          this.openSnackBar('SignUp Successfully');
          this.handleClear();
        },
        (error: any) => {
          console.log('Sign Up Error : ', error.error);
          this.spinner.hide();
          this.openSnackBar('Something went wrong');
        }
      );
    } else {
      this.openSnackBar('Please Enter Required Field');
    }
  }

  handleValidation() {
    $('#emailHelp').hide();
    $('#passwordHelp').hide();
    $('#confirmPasswordHelp').hide();
    console.log('email : ', $('#email').val());
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }
    console.log('password : ', $('#password').val());
    if ($('#password').val() === '') {
      $('#passwordHelp').show();
    }
    console.log('confirmPassword : ', $('#confirmPassword').val());
    if ($('#confirmPassword').val() === '') {
      $('#confirmPasswordHelp').show();
    }
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  handleSignIn() {
    window.location.href = '/signIn';
  }

  handleClear() {
    $('#email').val('');
    $('#password').val('');
    $('#confirmPassword').val('');
  }
}
