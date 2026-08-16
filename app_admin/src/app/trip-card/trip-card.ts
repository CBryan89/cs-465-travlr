import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {

  @Input({ required: true }) trip!: Trip;

  constructor(
    private authenticationService: Authentication
  ) { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
