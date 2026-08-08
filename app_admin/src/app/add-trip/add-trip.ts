import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, FormsModule],
  providers: [TripDataService],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip {

  public newTrip: Trip = {
    _id: '',
    code: '',
    name: '',
    length: '',
    start: new Date(),
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  public addTrip(): void {
    this.tripDataService.addTrip(this.newTrip)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Error adding trip: ' + error);
        }
      });
  }
}
