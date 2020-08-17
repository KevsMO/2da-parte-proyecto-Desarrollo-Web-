import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faTrash, faEdit,faPlus } from '@fortawesome/free-solid-svg-icons';
import { MyserviceService } from '../../myservice.service'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

  faProjectDiagram = faProjectDiagram; 
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  search = '';

  proyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6', 'Proyecto 7', 'Proyecto 8', 'Proyecto 9', 'Proyecto 10'];

  verIcono = [];
  llenarVariable() {
    for (let i = 0; i < this.proyectos.length; i++) {
      this.verIcono.push('');
    }
  }
  verIconos(id) {
    this.llenarVariable();
    this.verIcono[id] = 'ver-icono';
  }
  ocultarIconos(id) {
    this.llenarVariable();
    this.verIcono[id] = '';
  }

  planUsuario = 'gratis';
  proyectosTotalesUsario = 9;
  limite = false;
  deshabilitarBtn:string;
  comprobarLimite() {
    if ((this.planUsuario == 'gratis') && (this.proyectosTotalesUsario >= 10)) {
      this.ponerLimite();
    } else if ((this.planUsuario == 'basico') && (this.proyectosTotalesUsario >= 50)) {
      this.ponerLimite();
    } else if ((this.planUsuario == 'completo') && (this.proyectosTotalesUsario >= 100)) {
      this.ponerLimite();
    } else {
      this.quitarLimite()
    }
  }
  ponerLimite() {
    this.limite = true;
    this.deshabilitarBtn = 'deshabilitar';
  }
  quitarLimite(){
    this.limite == false;
    this.deshabilitarBtn = '';
  }

  ngOnInit(): void {
    this.comprobarLimite();
  }
}