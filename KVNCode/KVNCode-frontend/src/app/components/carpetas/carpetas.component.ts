import { Component, OnInit } from '@angular/core';
import { faFolder, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MyserviceService } from '../../myservice.service'

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrls: ['./carpetas.component.css']
})

export class CarpetasComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnInit(): void {
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