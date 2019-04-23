import { Injectable } from '@angular/core';
import { State } from 'src/app/model/State';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  appURI = "http://localhost:4000/register";

  constructor(private http: HttpClient) {

  }

  addUser(email, password, address, state: State, zipcode, phoneNumber: number): void {
    const user = {
      email: email,
      password: password,
      address: address,
      state: state,
      zipcode: zipcode,
      phoneNumber: phoneNumber
    };


    this.http.post(`${this.appURI}/adduser`, user)
      .subscribe(res => console.log('Added user to db'));
  }

}
