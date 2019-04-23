import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { State } from '../model/State';
import { UserService } from 'src/services/user.service';
import { WORLD_STATES_LIST } from 'src/config/constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  stateList: State[] = WORLD_STATES_LIST;

  submitted = false;
  registerFormChild: FormGroup;
  @Output() registered = new EventEmitter<boolean>();

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.registerFormChild = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      zipcode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  addUser(email, password, address, state: State, zipcode, phoneNumber: number): void {
    this.userService.addUser(email, password, address, state, zipcode, phoneNumber);
  }

  //getter for easier usage of form properties in template file
  get f() { return this.registerFormChild.controls; }

  emitRegisterEvent(event: any) {

  }

  isNumberKey(event): boolean {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
