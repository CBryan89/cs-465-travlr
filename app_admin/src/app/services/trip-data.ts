import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    const url = `${this.baseUrl}/trips`;
    return this.http.get<Trip[]>(url);
  }

  addTrip(trip: Trip): Observable<Trip> {
    const url = `${this.baseUrl}/trips`;
    return this.http.post<Trip>(url, trip);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    const url = `${this.baseUrl}/trips/${tripCode}`;
    return this.http.get<Trip[]>(url);
  }

  updateTrip(trip: Trip): Observable<Trip> {
    const url = `${this.baseUrl}/trips/${trip.code}`;
    return this.http.put<Trip>(url, trip);
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to process both login and register methods
  handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      this.baseUrl + '/' + endpoint,
      formData
    );
  }
}
