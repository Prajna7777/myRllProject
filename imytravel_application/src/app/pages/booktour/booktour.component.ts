import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-booktour',
  templateUrl: './booktour.component.html',
  styleUrl: './booktour.component.css',
})
export class BooktourComponent {
  Id = 0;
  TourID: Number = 0;
  bookingTourId: Number = 0;
  locationImageUrl: string = '';
  IsEdit = false;
  commentList: any[] = [];
  Poster = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    let data = this._localStorage.getItem('Place-Data');
    console.log('Data : ', data);
    if (data !== null) {
      this.IsEdit = true;
      let placeData = JSON.parse(data);
      this.TourID = placeData.id;
      $('#placeName').val(placeData.placeName);
      $('#placeCategory').val(placeData.placeCategory);
      $('#placeDescription').val(placeData.placeDescription);
      // debugger
    } else {
      this.IsEdit = false;
    }

    // this.GetCommentList(this.Id);
  }

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEditUserTour();
    } else {
      this.handleAddUserTour();
    }
  }

  handleAddUserTour() {

    $('#placeHelp').hide();
    $('#placeCategoryHelp').hide();
    $('#placeDescriptionHelp').hide();

    if ($('#placeName').val() === '') {
      $('#placeHelp').show();
    }
    if ($('#placeCategory').val() === '') {
      $('#placeCategoryHelp').show();
    }
    if ($('#placeDescription').val() === '') {
      $('#placeDescriptionHelp').show();
    }

    if (
      $('#placeName').val() === '' ||
      $('#placeCategory').val() === '' ||
      $('#placeDescription').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userID: this._localStorage.getItem('User-Id'),
      placeName: $('#placeName').val(),
      placeCategory: $('#placeCategory').val(),
      placeDescription: $('#placeDescription').val(),
    };

    this.businessService.createPlaceSuggestion(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Create Place Successfully');
        window.location.href = 'userdashboard/home';
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEditUserTour() {

    $('#placeHelp').hide();
    $('#placeCategoryHelp').hide();
    $('#placeDescriptionHelp').hide();

    if ($('#placeName').val() === '') {
      $('#placeHelp').show();
    }
    if ($('#placeCategory').val() === '') {
      $('#placeCategoryHelp').show();
    }
    if ($('#placeDescription').val() === '') {
      $('#placeDescriptionHelp').show();
    }

    if (
      $('#placeName').val() === '' ||
      $('#placeCategory').val() === '' ||
      $('#placeDescription').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.TourID,
      userID: this._localStorage.getItem('User-Id'),
      placeName: $('#placeName').val(),
      placeCategory: $('#placeCategory').val(),
      placeDescription: $('#placeDescription').val(),
    };
    
    this.businessService.updatePlaceSuggestion(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update User Tour Successfully');
        this.IsEdit = false;
        this._localStorage.removeItem('Place-Data');
        $('#placeName').val('');
        $('#placeCategory').val('');
        $('#placeDescription').val();
        window.location.href = 'userdashboard/home';
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
