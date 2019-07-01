import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Book } from '../../model/Book';
import { map, catchError, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { MongoService } from 'src/app/service/mongo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: any;
  booksOnHold: number = 0;
  bookName: string;
  public searchBarAutoComplete$: Observable<Book> = null;
  public autoCompleteControl = new FormControl();
  isRendered = false;
  rating: number;
  stars: Array<number> = new Array<number>();

  @ViewChild('pdfViewer') pdfViewer;

  constructor(
    private authenticationService: AuthenticationService,
    private mongoService: MongoService,
    private router: Router
  ) { }

  logOut() {
    this.authenticationService.logout();
  }

  lookup(value: string): Observable<any> {
    return this.mongoService.search(value).pipe(
      map(book => {
        if (book) {
          this.bookName = book.name;
          this.mongoService.getPdf(this.bookName).subscribe(data => {
            var fileURL = URL.createObjectURL(data);
            this.file = fileURL;
            window.open(fileURL);
            this.isRendered = true;
            this.rating = this.generateRating(5);
            this.populateStarsArray(this.rating);
          })
        }
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  populateStarsArray(rating: number) {
    this.stars = [];
    for (let i = 0; i < rating; i++) {
      this.stars.push(0);
    }
  }

  generateRating(maxValue: number): number {
    return Math.floor(Math.random() * Math.floor(maxValue));
  }

  goToBook() {
    this.router.navigate(['/bookView', `${this.bookName}`]);
  }

  ngOnInit(): void {
    this.searchBarAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    );
  }
}