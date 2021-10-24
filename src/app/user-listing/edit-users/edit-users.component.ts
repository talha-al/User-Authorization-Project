import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    roleValue: new FormControl(null, Validators.required),
    roleTxt: new FormControl(null),
  });
  roles = [
    { value: 0, txt: 'super admin' },
    { value: 1, txt: 'admin' },
    { value: 2, txt: 'customer' },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: IUser,
    private dialogRef: MatDialogRef<EditUsersComponent>
  ) {
    if (this.dialogData) {
      this.userForm.setValue(this.dialogData);
    }
  }

  ngOnInit(): void {}

  save() {
    this.userForm
      .get('roleTxt')
      ?.setValue(this.roles[this.userForm.get('roleValue')?.value].txt);
    const model = this.userForm.value as IUser;
    this.close(model);
  }

  close(result: IUser | null) {
    this.dialogRef.close(result);
  }
}

export interface IUser {
  userName: string;
  roleValue: number;
  roleTxt: string;
}
