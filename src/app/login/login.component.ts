import { Component, OnInit } from '@angular/core';
import { routes } from '../app-routing.module';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  route: Routes;
  registered: boolean = true;

  constructor() {

  }

  register(){
  }



}
