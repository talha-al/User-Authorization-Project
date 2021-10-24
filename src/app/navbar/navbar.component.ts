import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../user-listing/edit-users/edit-users.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUserisActive: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser?.userName) this.currentUserisActive = true;
  }
  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }
}
