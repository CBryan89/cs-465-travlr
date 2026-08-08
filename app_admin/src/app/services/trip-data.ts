import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    const url = 'http://localhost:3000/api/trips';
    return this.http.get<Trip[]>(url);
  }

  addTrip(trip: Trip): Observable<Trip> {
    const url = 'http://localhost:3000/api/trips';
    return this.http.post<Trip>(url, trip);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    const url = `http://localhost:3000/api/trips/${tripCode}`;
    return this.http.get<Trip[]>(url);
  }

  updateTrip(trip: Trip): Observable<Trip> {
    const url = `http://localhost:3000/api/trips/${trip.code}`;
    return this.http.put<Trip>(url, trip);
  }
}
