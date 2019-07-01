import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authenticationProvider } from './interceptor/authentication.interceptor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { BookViewComponent } from './components/book-view/book-view.component';
import { MatAutocompleteModule } from '@angular/material';
import { MongoService } from './service/mongo.service';
import { AuthenticationService } from './service/authentication.service';
import { RegisterService } from './service/register.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PdfViewerModule,
    PdfJsViewerModule,
    MatAutocompleteModule
  ],
  providers: [
    authenticationProvider,
    MongoService,
    AuthenticationService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
