import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {
  placeList: any[] = [];
  userID = 0;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public serviceService: ServiceService,
    private businessService: BusinessService,
    private _localStorage: localStorageSession
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

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
  handleBookTour() {
    console.log('My Booking To Profile');
    this.router.navigate(['/userdashboard/addplace']);
  }

  handleNevigateTour() {
    this.router.navigate(['/admindashboard/addtour']);
  }

  handleEditPlace(data: any) {
    this._localStorage.setItem('Place-Data', JSON.stringify(data));
    this.router.navigate(['userdashboard/addplace']);
  }

  handleDeletePlace(id: number) {
    this.businessService.deletePlaceSuggestion(id).subscribe((result: any) => {
      console.log('Result : ', result);
      this.handleGetTourlocationList();
    });
  }

  handleAddExperience(data:Number){
    this._localStorage.setItem('TravelExperience-Data', JSON.stringify(data));
    this.router.navigate(['userdashboard/addExperience']);
  }

  
}
