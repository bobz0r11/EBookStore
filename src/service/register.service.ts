import { Injectable } from '@angular/core';
import { State } from 'src/app/model/State';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  appURI = "http://localhost:4000/register";

  constructor(private http: HttpClient) {
  }

  /**
   * Adds new user to the database (register form)
   */
  addUser(email, password, address, state: State, zipcode, phoneNumber: number): Observable<any> {
    const user = {
      email: email,
      password: password,
      address: address,
      state: state,
      zipcode: zipcode,
      phoneNumber: phoneNumber
    };
    return this.http.post(`${this.appURI}/adduser`, user);
  }

}
