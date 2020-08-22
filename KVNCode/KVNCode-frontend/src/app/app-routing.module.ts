import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component'
import { RegistroComponent } from './components/registro/registro.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AboutComponent } from './components/about/about.component'
import { PlanesComponent } from './components/planes/planes.component'

import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login-register', component: RegistroComponent },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about',component: AboutComponent },
  { path: 'planes', component: PlanesComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
