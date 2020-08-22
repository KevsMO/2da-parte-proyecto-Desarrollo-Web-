import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../myservice.service';

import { UsuariosService } from './../../services/usuarios.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    public router: Router
  ) { }

  nickName:string;
  id:string;
  ngOnInit(): void {
    this.visualizarNav(this.myService.mostrarElementosNav);
    if(this.authService.isLoggedIn){
      let datos = JSON.parse(localStorage.getItem('datos'));
      this.nickName = datos.nickName;
      this.id = datos._id;
    }
  }
  
  verDashboard() {
    this.router.navigate(['dashboard/' + this.id]);
  }

  verRegistro(){
    this.myService.regionVisible = 'registro';
  }

  verLogin(){
    this.myService.regionVisible = 'login';
  }

  public isCollapsed = true;

  mostrarNav:boolean;
  paddingTop:string;
  tamanio:string;

  visualizarNav(valor) {
    if (valor){
      this.paddingTop = 'padding-top: 72px; min-height: 100vh; overflow: auto;';
      this.tamanio = 'height: calc(100vh - 72px);';
    }
    else {
      this.paddingTop = '';
      this.tamanio = 'min-height: 88.48vh; width: 100%; overflow: auto;';
    }
    this.mostrarNav = valor;
  }
}
