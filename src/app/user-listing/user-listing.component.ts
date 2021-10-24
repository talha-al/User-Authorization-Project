import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from '../services/alertify-service.service';
import { UserService } from '../services/user.service';
import { EditUsersComponent, IUser } from './edit-users/edit-users.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent implements OnInit {
  allUsers: IUser[] = [];
  currentUser = {} as IUser;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private alertify: AlertifyService
  ) {
    this.allUsers = this.userService.getAllUsers();
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {}

  addUser() {
    this.dialog
      .open(EditUsersComponent, {
        minWidth: '20%',
        maxWidth: '60%',
        disableClose: true,
        autoFocus: true,
        data: null,
      })
      .afterClosed()
      .subscribe((a) => {
        if (!a) return;
        else {
          this.allUsers.push(a);
          this.alertify.success(a.userName + ' User Added');
        }
      });
  }

  openUserEditDialog(user: IUser, index: number) {
    this.dialog
      .open(EditUsersComponent, {
        minWidth: '20%',
        maxWidth: '60%',
        disableClose: true,
        autoFocus: true,
        data: user ? user : null,
      })
      .afterClosed()
      .subscribe((a) => {
        if (!a) return;
        this.allUsers[index] = a;
      });
  }

  deleteUser(index: number) {
    this.allUsers.splice(index, 1);
    this.alertify.success(' User Deleted');
  }

  save() {
    this.userService.saveAllUsers(this.allUsers);
  }
}
