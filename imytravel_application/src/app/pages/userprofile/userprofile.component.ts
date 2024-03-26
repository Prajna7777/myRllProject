import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  IsProfileDetailExist = false;
  ProfileID = 0;
  List: any[] = [];
  userID = 0;
  IsEdit = false;
  ExperienceID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    let data = this._localStorage.getItem('TravelExperience-Data');
    if (data == null) {
    } else {
      let placeDetail = JSON.parse(data);
      $('#placeName').val(placeDetail.placeName);
      $('#placeCategory').val(placeDetail.placeCategory);
      $('#placeDescription').val(placeDetail.placeDescription);
    }

    this.getAllTravelExperiences();
  }

  getAllTravelExperiences() {
    let PlaceName = $('#placeName').val();
    this.serviceService.getAllTravelExperiences(PlaceName).subscribe({
      next: (result: any) => {
        this.List = result;
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleValidation() {
    $('#fullNameHelp').hide();
    $('#mobileNumberHelp').hide();
    $('#emailHelp').hide();
    $('#addressHelp').hide();
    let value = true;
    console.log('fullName : ', $('#fullName').val());

    if ($('#fullName').val() === '') {
      $('#fullNameHelp').show();
      value = false;
    }

    console.log('mobileNumber : ', $('#mobileNumber').val());
    if ($('#mobileNumber').val() === '') {
      $('#mobileNumberHelp').show();
      value = false;
    }

    console.log('email : ', $('#email').val());
    if ($('#email').val() === '') {
      $('#emailHelp').show();
      value = false;
    }

    console.log('address : ', $('#address').val());
    if ($('#address').val() === '') {
      $('#addressHelp').show();
      value = false;
    }

    return value;
  }

  handleSubmit() {
    // debugger;
    if (this.handleValidation()) {
      if (this.IsEdit) {
        this.handleEditProfile();
      } else {
        this.handleAddProfile();
      }
    }
  }

  handleAddProfile() {

    $('#costOfTravelHelp').hide();
    $('#heritagesHelp').hide();
    $('#placesToVisitHelp').hide();

    if (Number($('#costOfTravel').val()) <= 0) {
      $('#costOfTravelHelp').show();
    }
    if ($('#heritages').val() === '') {
      $('#heritagesHelp').show();
    }

    if ($('#placesToVisit').val() === '') {
      $('#placesToVisitHelp').show();
    }

    if(Number($('#costOfTravel').val()) <= 0||$('#heritages').val() === ''||$('#placesToVisit').val() === ''){
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userID: Number(this._localStorage.getItem('User-Id')),
      location: $('#placeName').val(),
      images: $('#image').val(),
      costOfTravel: Number($('#costOfTravel').val()),
      heritages: $('#heritages').val(),
      placesToVisit: $('#placesToVisit').val(),
      accessibility: $('#accessibility').val(),
      transportation: $('#transportation').val(),
      climate: $('#climate').val(),
      safety: $('#safety').val(),
    };

    this.serviceService.createTravelExperience(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Create Travel Experience Successfully');
        this.getAllTravelExperiences();
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEditProfile() {

    $('#costOfTravelHelp').hide();
    $('#heritagesHelp').hide();
    $('#placesToVisitHelp').hide();

    if (Number($('#costOfTravel').val()) <= 0) {
      $('#costOfTravelHelp').show();
    }
    if ($('#heritages').val() === '') {
      $('#heritagesHelp').show();
    }

    if ($('#placesToVisit').val() === '') {
      $('#placesToVisitHelp').show();
    }

    if(Number($('#costOfTravel').val()) <= 0||$('#heritages').val() === ''||$('#placesToVisit').val() === ''){
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ExperienceID,
      userID: Number(this._localStorage.getItem('User-Id')),
      location: $('#placeName').val(),
      images: $('#image').val(),
      costOfTravel: Number($('#costOfTravel').val()),
      heritages: $('#heritages').val(),
      placesToVisit: $('#placesToVisit').val(),
      accessibility: $('#accessibility').val(),
      transportation: $('#transportation').val(),
      climate: $('#climate').val(),
      safety: $('#safety').val(),
    };

    this.serviceService.updateTravelExperience(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Update Travel Experience Successfully');
        this.getAllTravelExperiences();
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleEditExperience(data: any) {
    // 
    this.IsEdit = true;
    this.ExperienceID = data.id;
    $('#image').val(data.images);
    $('#costOfTravel').val(data.costOfTravel);
    $('#heritages').val(data.heritages);
    $('#placesToVisit').val(data.placesToVisit);
    $('#accessibility').val(data.accessibility);
    $('#transportation').val(data.transportation);
    $('#climate').val(data.climate);
    $('#safety').val(data.safety);
  }

  handleDeleteExperience(data: any) {
    this.serviceService.deleteTravelExperience(data).subscribe({
      next: (result: any) => {
        console.log('deleteTravelExperience Result ', result);
        this.getAllTravelExperiences();
        this.openSnackBar('delete Experience Successfully');
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleAddComment(data: any) {
    // 
    // this.router.navigate(['comment/' + data.id]);
    window.location.href = 'userdashboard/comment/' + data.id;
  }

  handleClear() {
    this.IsEdit = false;
    $('#image').val('');
    $('#costOfTravel').val('');
    $('#heritages').val('');
    $('#placesToVisit').val('');
    $('#accessibility').val('');
    $('#transportation').val('');
    $('#climate').val('');
    $('#safety').val('');
  }
}
