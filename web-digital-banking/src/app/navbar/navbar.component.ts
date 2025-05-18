import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private authService : AuthService) { }

  ngOnInit(): void {
  }

  handleLogout() {
    console.log("Logout");
    this.authService.logout();
  }
}
