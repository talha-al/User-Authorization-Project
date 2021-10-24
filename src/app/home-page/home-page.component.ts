import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../user-listing/edit-users/edit-users.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  permission: boolean = false;

  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (
      currentUser?.roleTxt === 'admin' ||
      currentUser?.roleTxt === 'super admin'
    )
      this.permission = true;
  }

  openEditUsers() {
    this.router.navigate(['userListing']);
    this.permission = false;
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToLinkedin() {
    window.location.href = 'https://www.linkedin.com/in/talhaalatas/';
  }

  goToGithub() {
    window.location.href = 'https://github.com/talha-al?tab=repositories';
  }
}
