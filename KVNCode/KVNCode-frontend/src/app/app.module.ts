import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingComponent } from './components/landing/landing.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';

import { AceEditorModule } from 'ng2-ace-editor';
import { CarpetasComponent } from './components/carpetas/carpetas.component';
import { FilterPipe } from 'src/app/filter.pipe';
import { AboutComponent } from './components/about/about.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { PlanesComponent } from './components/planes/planes.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authconfig.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegistroComponent,
    DashboardComponent,
    DesarrolloComponent,
    CarpetasComponent,
    FilterPipe,
    AboutComponent,
    ProyectosComponent,
    SnippetsComponent,
    EditarPerfilComponent,
    PlanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
