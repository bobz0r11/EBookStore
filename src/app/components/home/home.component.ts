import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Book } from '../../model/Book';
import { map, catchError, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { MongoService } from 'src/app/service/mongo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  booksOnHold: number = 0;
  public searchBarAutoComplete$: Observable<Book> = null;
  public autoCompleteControl = new FormControl();

  constructor(
    private authenticationService: AuthenticationService,
    private mongoService: MongoService
  ) { }

  logOut() {
    this.authenticationService.logout();
  }

  lookup(value: string): Observable<any> {
    return this.mongoService.search(value).pipe(
      // map the item property of the github results as our return object
      map(results => {
        console.log(results + " <----------- RESULTS")
        results.items;
      }),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit(): void {
    this.searchBarAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }
}