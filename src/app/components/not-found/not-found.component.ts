import { Component, ViewChild, OnInit } from '@angular/core';
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



  `
})
export class NotFoundComponent {
  

}