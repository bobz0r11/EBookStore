import { Component, OnInit } from '@angular/core';
import { State } from '../model/State';
import { UserService } from 'src/services/user.service';
import { WORLD_STATES_LIST } from 'src/config/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  stateList: State[] = WORLD_STATES_LIST;

  registerFormChild: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.registerFormChild = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  addUser(email, password, address, state: State, zipcode, phoneNumber: number): void {
    this.userService.addUser(email, password, address, state, zipcode, phoneNumber);
  }
}
