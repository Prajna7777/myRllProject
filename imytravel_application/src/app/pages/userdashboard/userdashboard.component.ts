import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css',
})
export class UserdashboardComponent {
  constructor(
    private router: Router,
    private _localStorage: localStorageSession
  ) {}

  handleNavHome() {
    console.log('Navigate To Home');
    this.router.navigate(['/userdashboard/home']);
  }

  // handleNavProfile() {
  //   console.log('Navigate To Profile');
  //   this.router.navigate(['/userdashboard/addExperience']);
  // }

  handleNavMyBooking() {
    console.log('Navigate To My Booking');
    this.router.navigate(['/userdashboard/mybooking']);
  }

  handleNavSignOut() {
    console.log('Navigate To SignOut');
    this._localStorage.removeItem('User-Id');
    this._localStorage.removeItem('User-Token');
    this._localStorage.removeItem('User-Email');
    this.router.navigate(['']);
  }
}
