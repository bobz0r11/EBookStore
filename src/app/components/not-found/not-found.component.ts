import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  template: `
    <div class="jumbotron text-center">
      <h1>404 Not Found</h1>
      <p>You may be lost. Follow the breadcrumbs back home.</p>
    </div>

    <button (click)="openPdf();">Open Pdf</button>
 

    <div>
      <label>PDF src</label>
      <input type="text" placeholder="PDF src" [(ngModel)]="file">
  </div>

    <pdf-viewer [(src)]="file" [original-size]="true" [show-all]="true"></pdf-viewer>

  `
})
export class NotFoundComponent {

  appURI = "http://localhost:4000/getfile";
  file: any;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  @ViewChild('pdfViewer') pdfViewer;

  private downloadPDF(): Observable<any> {
    return this.http.get(`${this.appURI}`, { responseType: 'arraybuffer' }).pipe(map(
      (res) => {
        return new Blob([res], { type: "application/pdf" });
      }));
  }

  public openPdf() {
    let url = "src/pdf123.pdf";


    console.log("----------------");
    this.downloadPDF().subscribe(data => {
      var fileURL = URL.createObjectURL(data);
      this.file = fileURL;
      window.open(fileURL);
    });

    console.log("----------------");


  }


}