import { Component, ViewChild, OnInit } from '@angular/core';
import { MongoService } from 'src/app/service/mongo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  filename: any;
  appURI = "http://localhost:4000/getfile";
  file: any;
  booksOnHold = 0;
  pageNum = 1;
  totalPagesNumber;
  endOfFile = false;
  startOfFile = true;

  @ViewChild('pdfViewer') pdfViewer;

  constructor(
    private mongoService: MongoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filename = this.router.url.split("/").slice(-1);
    this.openPdf(this.filename);

  }

  public openPdf(fileName) {
    this.mongoService.getPdf(fileName).subscribe(data => {
      var fileURL = URL.createObjectURL(data);
      this.file = fileURL;
      window.open(fileURL);
    });
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
