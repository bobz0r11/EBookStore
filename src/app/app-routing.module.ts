import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
