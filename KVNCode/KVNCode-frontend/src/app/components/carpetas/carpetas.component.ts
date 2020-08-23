import { Component, OnInit } from '@angular/core';
import { faFolder, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MyserviceService } from '../../myservice.service'
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrls: ['./carpetas.component.css']
})

export class CarpetasComponent implements OnInit {

  ngOnInit(): void { }

  usuarioActual:any = {};
  snippets:any;
  nombresSnippets:any = [];
  idSnippets:any = [];

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.obtenerUnUsuario(id).subscribe(res => {
      this.usuarioActual = res.msg;
      this.snippets = this.usuarioActual.snippets;
      // this.llenarSippets();
      let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
      localStorage.setItem('datos', JSON.stringify(datos));
    });
  }

  faFolder = faFolder; 
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  search = '';

  carpetas = ['Carpeta 1', 'Carpeta 2', 'Carpeta 3', 'Carpeta 4', 'Carpeta 5', 'Carpeta 6', 'Carpeta 7', 'Carpeta 8', 'Carpeta 9', 'Carpeta 10'];

  verIcono = [];
  verIconos(id) {
    this.llenarVariable();
    this.verIcono[id] = 'ver-icono';
  }
  ocultarIconos(id) {
    this.llenarVariable();
    this.verIcono[id] = '';
  }
  llenarVariable() {
    for (let i = 0; i < this.carpetas.length; i++) {
      this.verIcono.push('');
    }
  }
}