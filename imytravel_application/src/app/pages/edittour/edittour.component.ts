import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-edittour',
  templateUrl: './edittour.component.html',
  styleUrl: './edittour.component.css',
})
export class EdittourComponent {
  Id = 0;
  ExperienceID: Number = 0;
  locationImageUrl: string = '';
  List: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Access the id parameter from the URL
      this.ExperienceID = params['id'];

      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.ExperienceID);
    });

    this.handleGetComment();
  }

  handleGetComment() {
    this.serviceService.getAllComments(this.ExperienceID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  handleValidation() {
    $('#locationNameHelp').hide();
    $('#locationImageUrlHelp').hide();
    $('#confirmPasswordHelp').hide();
    let value = true;
    console.log('locationName : ', $('#locationName').val());

    if ($('#locationName').val() === '') {
      $('#locationNameHelp').show();
      value = false;
    }

    console.log('locationImageUrl : ', $('#locationImageUrl').val());
    if ($('#locationImageUrl').val() === '') {
      $('#locationImageUrlHelp').show();
      value = false;
    }

    console.log('costOfTravel : ', $('#costOfTravel').val());
    if ($('#costOfTravel').val() === '') {
      $('#costOfTravelHelp').show();
      value = false;
    }

    return value;
  }

  handleDeleteComment(Id: Number) {
    this.serviceService.deleteComment(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Comment Successfully');
        this.handleGetComment();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
