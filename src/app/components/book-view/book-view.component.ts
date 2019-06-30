import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  filename: any = 'Effective-Java-2nd-Edition';

  ngOnInit(): void {
    this.openPdf(this.filename);
  }

  appURI = "http://localhost:4000/getfile";
  file: any;
  booksOnHold = 0;
  pageNum = 1;
  totalPagesNumber;
  endOfFile = false;
  startOfFile = true;

  constructor(
    private http: HttpClient,
  ) { }

  @ViewChild('pdfViewer') pdfViewer;

  private getPdf(name): Observable<any> {
    return this.http.get(`${this.appURI}/` + name, { responseType: 'arraybuffer' })
      .pipe(map((res) => {
        return new Blob([res], { type: "application/pdf" });
      }));
  }

  public openPdf(fileName) {
    console.log("----------------");
    this.getPdf(fileName).subscribe(data => {
      var fileURL = URL.createObjectURL(data);
      this.file = fileURL;
      window.open(fileURL);
    });
    console.log("----------------");
  }

  increment() {
    if (this.pageNum === this.totalPagesNumber) {
      this.endOfFile = true;
      this.startOfFile = false;
      return;
    }
    this.startOfFile = false;
    this.pageNum++;
  }

  decrement() {
    console.log(this.pageNum);
    if (this.pageNum === 1) {
      this.startOfFile = true;
      return;
    }
    this.pageNum--;
    this.endOfFile = false;
  }

  getTotalPagesNumber(event) {
    this.totalPagesNumber = event.numPages;
  }

}
