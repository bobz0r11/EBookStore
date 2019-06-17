import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  userDoesNotExist = false;
  wrongUsernameOrPassword = false;
  loggingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  login(username, password) {
    //Checks if user already exists
    this.authenticationService.accountExists(username).subscribe((data: User[]) => {
      //If user does not exist
      if (data.length === 0) {
        this.userDoesNotExist = true;
        return;
      } else {
        //If user exists
        let user: User = data[0];
        if (user.email != username || user.password != password) {
          this.wrongUsernameOrPassword = true;
          setTimeout(() => {
            this.wrongUsernameOrPassword = false;
          }, 3000);
        }
      }
    }, err => console.log(err),
      () => { //on observable complete
        if (this.userDoesNotExist) {
          //Hide popup after 3sec
          setTimeout(() => {
            this.userDoesNotExist = false;
          }, 3000);
          return;
        }

        if (!this.wrongUsernameOrPassword) {
          this.authenticationService.login(username, password).subscribe(response => {
            if (response) {
              this.loggingIn = true;
              setTimeout(() => {
                this.router.navigate(['/home']);
                this.loggingIn = false;
              }, 1500);
            }
          });
        }
      })
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }
}
