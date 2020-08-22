import { Component, OnInit } from '@angular/core';

import { MyserviceService } from '../../myservice.service';
import { UsuariosService } from './../../services/usuarios.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    public router: Router
  ) { }

  nickName:string;
  id:string;
  planUsuario:string;
  ngOnInit(): void {
    this.visualizarNav(this.myService.mostrarElementosNav, this.myService.planesDesdeLanding);
    if(this.authService.isLoggedIn){
      let datos = JSON.parse(localStorage.getItem('datos'));
      this.nickName = datos.nickName;
      this.id = datos._id;
      this.planUsuario = datos.plan;
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
  planesDesdeLanding:boolean;

  visualizarNav(elementsNav, landingPlanes) {
    if (elementsNav){
      this.paddingTop = 'padding-top: 72px; min-height: 100vh; overflow: auto;';
      this.tamanio = 'height: calc(100vh - 72px);';
    }
    else {
      this.paddingTop = '';
      this.tamanio = 'min-height: 88.48vh; width: 100%; overflow: auto;';
    }
    this.mostrarNav = elementsNav;
    this.planesDesdeLanding = landingPlanes;
  }
  
  planes = [
    {
      nombre: "Gratis",
      precio: 0,
      limite: "10 proyectos"
    },
    {
      nombre: "Básico",
      precio: 5,
      limite: "50 proyectos"
    },
    {
      nombre: "Full",
      precio: 10,
      limite: "100 proyectos"
    },
    {
      nombre: "VIP",
      precio: 15,
      limite: "Sin límites"
    }
  ];

  cambiarPlan(plan) {
    this.authService.actualizarPlan(this.id, {plan: plan.toLowerCase()}).subscribe(
      res => {
        this.planUsuario = plan.toLowerCase();
        let datos = {_id: this.id, nickName: this.nickName, plan: this.planUsuario};
        localStorage.setItem('datos', JSON.stringify(datos));
      },
      error => {
        window.alert(error.message);
      }
    );
  }
}
