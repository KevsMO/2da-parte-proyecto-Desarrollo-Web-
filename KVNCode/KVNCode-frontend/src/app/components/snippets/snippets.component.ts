import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faStickyNote, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MyserviceService } from '../../myservice.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {
  
  formSnippet = new FormGroup({
    nombreSnippet: new FormControl('', [Validators.required, Validators.minLength(3)]),
    extension: new FormControl('', [Validators.required])
  });

  @ViewChild('editor') editor;

  ngAfterViewInit() {
    console.log(this.editor);
    // this.snippetEditor.getEditor().setOptions({
    //   wrap: true,
    //   autoScrollEditorIntoView: true,
    //   enableBasicAutocompletion: true,
    //   enableLiveAutocompletion: true,
    //   enableSnippets: true,
    // });
    // this.snippetEditor.mode = 'html';
  }

  ngOnInit(): void {
    
  }

  modo(){
    console.log(this.editor.value);
  }

  usuarioActual:any = {};
  snippets:any;
  nombresSnippets:any = [];

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
      this.llenarSippets();
      let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
      localStorage.setItem('datos', JSON.stringify(datos));
    });
  }

  guardarSnippet() {

  }


  open(modal, size) {
    this.modalService.open(modal, {size: size});
    
  }

  llenarSippets() {
    for (let i = 0; i < this.snippets.length; i++) {
      this.nombresSnippets.push(this.snippets[i].nombreSnippet);
    }
  }

  faStickyNote = faStickyNote; 
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  search = '';

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
