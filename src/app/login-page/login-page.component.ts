import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify-service.service';
import { UserService } from '../services/user.service';
import { IUser } from '../user-listing/edit-users/edit-users.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  userName = new FormControl(null, [Validators.min(2), Validators.required]);
  allUsers: IUser[] = [];
  currentUser: IUser | any;
  signUpControl: boolean = false;
  userIsActive: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    if (!this.userService.getAllUsers().length) {
      this.initRoles();
    }
    this.allUsers = this.userService.getAllUsers();
    this.currentUser = this.userService.getCurrentUser();
  }

  initRoles() {
    const admin = {
      roleValue: 1,
      roleTxt: 'admin',
      userName: 'admin',
    } as IUser;
    const superAdmin = {
      roleValue: 1,
      roleTxt: 'super admin',
      userName: 'super admin',
    } as IUser;
    const customer = {
      roleValue: 1,
      roleTxt: 'customer',
      userName: 'customer',
    } as IUser;

    let arry = [];
    arry.push(admin, superAdmin, customer);
    this.saveAllUsers(arry);
  }

  signUp() {
    this.signUpControl = !this.signUpControl;
    this.userName.setValue(null);
  }

  logOut() {
    this.currentUser = null;
    this.userService.saveCurrentUser(null);
    window.location.reload();
    this.alertify.success('Exit successful');
  }

  userAuthentication(userName: string) {
    if (this.allUsers.some((a) => a.userName === userName)) {
      this.currentUser = this.allUsers.find((a) => a.userName === userName);
      this.saveCurrentUser(this.currentUser);
      this.alertify.success('User login successful');
      this.router.navigate(['home']);
    } else this.alertify.error('User login failed');
  }

  addNewUser(userName: string) {
    this.allUsers.push({
      userName: userName,
      roleTxt: 'customer',
      roleValue: 2,
    });
    this.saveAllUsers(this.allUsers);
    this.alertify.success('New user added');
    this.signUp();
  }

  saveCurrentUser(model: IUser | any) {
    this.userService.saveCurrentUser(model);
  }
  saveAllUsers(model: IUser[]) {
    this.userService.saveAllUsers(model);
  }
}
