import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authenticationService: Authentication,
    private router: Router
  ) { }

  public onLoginSubmit(): void {

    const user: User = new User();
    user.email = this.credentials.email;

    this.authenticationService.login(
      user,
      this.credentials.password
    ).subscribe({
      next: (response: any) => {
        this.authenticationService.saveToken(response.token);
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        console.log('Login error:', error);
      }
    });
  }
}
