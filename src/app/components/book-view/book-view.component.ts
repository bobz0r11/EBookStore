import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  ngOnInit(): void {
    this.openPdf();
  }

  appURI = "http://localhost:4000/getfile";
  file: any;
  booksOnHold = 0;
  pageNum = 38;
  totalPagesNumber;
  endOfFile = false;

  constructor(
    private http: HttpClient,
  ) { }

  @ViewChild('pdfViewer') pdfViewer;

  private downloadPDF(): Observable<any> {
    return this.http.get(`${this.appURI}`, { responseType: 'arraybuffer' }).pipe(map(
      (res) => {
        return new Blob([res], { type: "application/pdf" });
      }));
  }

  public openPdf() {
    console.log("----------------");
    this.downloadPDF().subscribe(data => {
      var fileURL = URL.createObjectURL(data);
      this.file = fileURL;
      window.open(fileURL);
    });
    console.log("----------------");
  }

  increment() {
    if(this.pageNum === this.totalPagesNumber){
      this.endOfFile = true;
      return;
    }
    this.pageNum++;
  }

  decrement() {
    this.pageNum--;
    this.endOfFile = false;
  }

  getTotalPagesNumber(event) {
    this.totalPagesNumber = event.numPages;
  }

}
