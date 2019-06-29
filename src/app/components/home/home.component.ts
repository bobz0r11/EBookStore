import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  booksOnHold: number = 0;
 

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
  }




  logOut() {
    this.authenticationService.logout();
  }

}