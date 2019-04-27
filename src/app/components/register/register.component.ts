import { Component } from '@angular/core';
import { State } from '../../model/State';
import { RegisterService } from 'src/app/service/register.service';
import { WORLD_STATES_LIST } from 'src/app/config/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  stateList: State[] = WORLD_STATES_LIST;

  registerFormChild: FormGroup;

  successfullyRegistered = false;
  submitted = false;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
  ) {
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
    this.registerService.addUser(email, password, address, state, zipcode, phoneNumber).subscribe(
      userData => {
        if (userData) {
          this.successfullyRegistered = true;
          this.submitted = true;
        }
      }, error => {
        if (error) {
          this.successfullyRegistered = false;
          this.submitted = true;
        }
      }
    )
  }

  //getter for easier usage of form properties in template file
  get form() { return this.registerFormChild.controls; }

  isNumberKey(event): boolean {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
