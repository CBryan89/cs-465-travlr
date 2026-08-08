import { Component, OnInit, signal } from '@angular/core';
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
    private tripDataService: TripDataService
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
            console.log('Error retrieving trip: ' + error);
          }
        });
    }
  }

  public updateTrip(): void {
    this.tripDataService.updateTrip(this.trip())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Error updating trip: ' + error);
        }
      });
  }
}
