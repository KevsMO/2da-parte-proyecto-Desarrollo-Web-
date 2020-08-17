import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component'
import { RegistroComponent } from './components/registro/registro.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AboutComponent } from './components/about/about.component'

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login-register',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
