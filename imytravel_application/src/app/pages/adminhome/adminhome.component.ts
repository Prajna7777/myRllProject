import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtourComponent } from '../addtour/addtour.component';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
})
export class AdminhomeComponent {
  tourLocationList: any[] = [];
  placeList: any[] = [];
  userID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public businessService: BusinessService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleGetTourlocationList();
  }

  handleGetTourlocationList() {
    this.businessService.getAllPlaceSuggestions().subscribe((result: any) => {
      console.log('Result : ', result);
      this.placeList = result;
    });
  }

  handleDeletePlace(id: number) {
    this.businessService.deletePlaceSuggestion(id).subscribe((result: any) => {
      console.log('Result : ', result);
      this.handleGetTourlocationList();
    });
  }

  handleNevigateTour() {
    this.router.navigate(['/admindashboard/addtour']);
  }

  handleEditTour(id: number) {
    this.router.navigate(['/admindashboard/edittour/' + id]);
  }

  handleRemoveTour(tourId: Number) {
    // this.businessService.deleteTourLocation(tourId).subscribe({
    //   next: (result: any) => {
    //     console.log('Result : ', result);
    //     this.openSnackBar('Remove Tour Successfully');
    //     this.handleGetTourlocationList();
    //   },
    //   error: (error: any) => {
    //     console.log('Error : ', error);
    //     this.openSnackBar('Something went wrong');
    //   },
    // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
