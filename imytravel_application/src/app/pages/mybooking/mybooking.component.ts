import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrl: './mybooking.component.css',
})
export class MybookingComponent {
  UserBookingTour: any[] = [];
  List: any[] = [];
  UserID = 0;
  ExperienceID = 0;
  CommentID = 0;
  IsEdit = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.\

    this.route.params.subscribe((params) => {
      // Access the id parameter from the URL
      this.ExperienceID = params['id'];

      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.ExperienceID);
    });

    this.handleGetComment();
  }

  handleGetComment() {
    let UserID = Number(this._localStorage.getItem('User-Id'));
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

  handleSubmit() {
    
    if (this.IsEdit) {
      this.handleEditsComment();
    } else {
      this.handleAddComment();
    }
  }

  handleAddComment() {

    if($('#comment').val()===''){
      this.openSnackBar('Please Enter Comment');
      return;
    }

    console.log('Add Comment');
    let data = {
      experienceID: Number(this.ExperienceID),
      userID: this.UserID,
      text: $('#comment').val(),
    };
    this.serviceService.addComment(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Comment Successfully');
        this.handleGetComment();
        $('#comment').val('');
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEditsComment() {

    if($('#comment').val()===''){
      this.openSnackBar('Please Enter Comment');
      return;
    }

    let data = {
      id: this.CommentID,
      experienceID: Number(this.ExperienceID),
      userID: this.UserID,
      text: $('#comment').val(),
    };
    this.serviceService.updateComment(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Comment Successfully');
        this.handleGetComment();
        this.IsEdit = false;
        $('#comment').val('');
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEdit(Id: number, userTourBookingId: number, data: any) {
    console.log('My Booking To Profile');
    this._localStorage.setItem('EditBooking', JSON.stringify(data));
    this.router.navigate([
      '/userdashboard/booktour/' + Id + '/' + userTourBookingId,
    ]);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleEditComment(data: any, commentID: any) {
    $('#comment').val(data);
    this.IsEdit = true;
    this.CommentID = commentID;
  }

  handleDeleteComment(Id: Number) {
    this.serviceService.deleteComment(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Comment Successfully');
        this.handleGetComment();
        $('#comment').val('');
        this.IsEdit = false;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }
}
