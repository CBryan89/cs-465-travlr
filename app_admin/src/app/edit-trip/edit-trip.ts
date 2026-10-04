import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, FormsModule],
  providers: [TripDataService],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {

  public errorMessage: string = '';

  public trip = signal<Trip>({
    _id: '',
    code: '',
    name: '',
    length: '',
    start: new Date(),
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (tripCode) {
      this.tripDataService.getTrip(tripCode)
        .subscribe({
          next: (trips: Trip[]) => {
            if (trips.length > 0) {
              this.trip.set(trips[0]);
            }
          },
          error: (error: any) => {
            console.error('Error retrieving trip:', error);

            this.errorMessage =
              'Unable to retrieve the trip. Please try again.';

            this.changeDetector.detectChanges();
          }
        });
    }
  }

  public updateTrip(): void {
    // Clear any previous error message
    this.errorMessage = '';

    this.tripDataService.updateTrip(this.trip())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);

          if (error.error?.errors) {
            this.errorMessage =
              Object.values(error.error.errors).join(' ');
          } else if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              'Unable to update trip. Please check the information and try again.';
          }

          this.changeDetector.detectChanges();
        }
      });
  }
}
