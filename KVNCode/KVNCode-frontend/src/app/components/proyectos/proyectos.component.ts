import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faTrash, faEdit,faPlus } from '@fortawesome/free-solid-svg-icons';

import { MyserviceService } from '../../myservice.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ProyectosService } from '../../services/proyectos.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  usuarioActual:any = {};
  carpetas:any;
  idCarpetas:any = [];
  proyectosPorCarpeta:any = [];
  proyectosTatales:any = [];
  nombresproyectos:any = [];
  idProyectos:any = [];

  verTodasCarpetas = true;

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    public proyService: ProyectosService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {

    if(this.verTodasCarpetas){
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.authService.obtenerUnUsuario(id).subscribe(res => {
        this.usuarioActual = res.msg;
        this.idCarpetas = this.usuarioActual.carpetas;
        console.log(this.idCarpetas);
        let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
        localStorage.setItem('datos', JSON.stringify(datos));

        for (let i = 0; i < this.idCarpetas.length; i++) {
          this.proyService.obtenerProyectos(this.idCarpetas[i]).subscribe(res => {
            this.proyectosPorCarpeta.push(res[0].proyectos);
            console.log(this.proyectosPorCarpeta);
          });

        for (let i = 0; i < this.proyectosPorCarpeta.length; i++)
          // for (let j = 0; j < this.proyectosPorCarpeta[i].length; j++) {
            this.proyectosTatales = this.proyectosPorCarpeta[i].map(element => {
              return element
            });
            console.log(this.proyectosTatales);
            
          // }  
        
        }
      });
    }
  }

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