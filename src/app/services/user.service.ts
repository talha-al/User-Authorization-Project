import { Injectable } from '@angular/core';
import { IUser } from '../user-listing/edit-users/edit-users.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getAllUsers(): IUser[] {
    return JSON.parse(localStorage.getItem('allUsers') || '{}');
  }

  getCurrentUser(): IUser {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  saveCurrentUser(model: IUser | any) {
    return localStorage.setItem('currentUser', JSON.stringify(model));
  }

  saveAllUsers(model: IUser[]) {
    return localStorage.setItem('allUsers', JSON.stringify(model));
  }
}
