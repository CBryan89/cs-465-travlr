import { ChangeDetectorRef, Component } from '@angular/core';
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

  public errorMessage: string = '';

  public newTrip: Trip = {
    _id: '',
    code: '',
    name: '',
    length: '',
    start: new Date().toISOString().split('T')[0] as any,
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  public addTrip(): void {
    // Clear any previous error message
    this.errorMessage = '';

    this.tripDataService.addTrip(this.newTrip)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error adding trip:', error);

          // Display server-side validation errors
          if (error.error?.errors) {
            this.errorMessage =
              Object.values(error.error.errors).join(' ');
          } else if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              'Unable to add trip. Please check the information and try again.';
          }

          // Update the page with the new error message
          this.changeDetector.detectChanges();
        }
      });
  }
}
