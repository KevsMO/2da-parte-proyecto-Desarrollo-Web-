import { Component, OnInit } from '@angular/core';
import { faStickyNote, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MyserviceService } from '../../myservice.service'

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnInit(): void {
  }

  faStickyNote = faStickyNote; 
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  search = '';

  snippets = ['Snippet 1', 'Snippet 2', 'Snippet 3', 'Snippet 4', 'Snippet 5', 'Snippet 6', 'Snippet 7', 'Snippet 8', 'Snippet 9', 'Snippet 10'];

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
    for (let i = 0; i < this.snippets.length; i++) {
      this.verIcono.push('');
    }
  }
}
