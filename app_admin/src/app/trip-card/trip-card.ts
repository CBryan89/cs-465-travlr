import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input({ required: true }) trip!: Trip;
}
