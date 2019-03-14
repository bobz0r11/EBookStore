import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/business.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private businessService: BusinessService) { }

  addBusiness(person_name, busines_name, business_gst_number) {
    this.businessService.addBusiness(person_name, busines_name, business_gst_number);
  }

}