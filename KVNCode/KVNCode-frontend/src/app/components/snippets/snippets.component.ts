import { Component, OnInit } from '@angular/core';
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

  ngAfterViewInit() { }

  ngOnInit(): void { }
  
  formSnippet = new FormGroup({
    nombreSnippet: new FormControl('', [Validators.required, Validators.minLength(3)]),
    extension: new FormControl('', [Validators.required]),
    contenidoSnippet: new FormControl('')
  });

  contenidoSnippet = '';
  modoSnippet;
  optionsSnippet:any = {wrap: true, autoScrollEditorIntoView: true, enableBasicAutocompletion: true, enableLiveAutocompletion: true, enableSnippets: true};

  establecerModo(){
    try {
      this.modoSnippet = this.formSnippet.get('extension').value;
    } catch (error) {
      if(error != null){
        this.formSnippet.get('extension').setErrors({invalid: true});
      }
    }
  }

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
      this.llenarSippets();
      let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
      localStorage.setItem('datos', JSON.stringify(datos));
    });
  }

  guardarSnippet() {
    this.formSnippet.get('contenidoSnippet').setValue(this.contenidoSnippet);
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.crearSnippet(id, this.formSnippet.value).subscribe(
      res => {
        this.authService.obtenerUnUsuario(id).subscribe(res => {
          this.usuarioActual = res.msg;
          this.snippets = this.usuarioActual.snippets;
          this.llenarSippets();
          this.formSnippet.reset();    
        });
    });
  }

  snippetParaVer:any = {};
  actualizarNombre = '';
  actualizarExtension = '';
  actualizarContenido = '';
  verSnippet(id, modalVerSnippet) {
    if(this.verModalSnippet) {
      let idUsuario = this.actRoute.snapshot.paramMap.get('id');
      this.authService.obtenerSnippet(idUsuario, id).subscribe(
        res => {
          this.snippetParaVer = res.snippets[0];
          this.actualizarNombre = res.snippets[0].nombreSnippet;
          this.actualizarExtension = res.snippets[0].extension;
          this.actualizarContenido = res.snippets[0].contenidoSnippet;
          this.open(modalVerSnippet, 'lg');
        }
      );
    }
  }
  
  actualizarSnippet() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    let datos = {nombreSnippet: this.actualizarNombre, extension: this.actualizarExtension, contenidoSnippet: this.actualizarContenido}
    this.authService.actualizarSnippet(id, this.snippetParaVer._id, datos).subscribe(
      res => {
        this.authService.obtenerSnippet(id, this.snippetParaVer._id).subscribe(
          res => {
            this.snippetParaVer = res.snippets[0];
        });
    });
  }

  preguntar(idSnippet, modal) {
    this.verModalSnippet = false;
    let idUsuario = this.actRoute.snapshot.paramMap.get('id');
    this.authService.obtenerSnippet(idUsuario, idSnippet).subscribe(
      res => {
        this.snippetParaVer = res.snippets[0];
        this.open(modal, 'lg');
    });
  }

  verModalSnippet = true;
  eliminarSnippet() {
    this.verModalSnippet = true;
    let idUsuario = this.actRoute.snapshot.paramMap.get('id');
    this.authService.eliminarSnippet(idUsuario, this.snippetParaVer._id).subscribe(
      res => {
        this.authService.obtenerUnUsuario(idUsuario).subscribe(res => {
          this.usuarioActual = res.msg;
          this.snippets = this.usuarioActual.snippets;
          this.llenarSippets(); 
        });
    });
  }

  open(modal, size) {
    this.modalService.open(modal, {size: size}).result.then((result) => {
      this.verModalSnippet = true;
    }, (reason) => {
      this.verModalSnippet = true;
    });    
  }

  llenarSippets() {
    this.nombresSnippets = [];
    this.idSnippets = [];
    for (let i = 0; i < this.snippets.length; i++) {
      this.nombresSnippets.push(this.snippets[i].nombreSnippet);
      this.idSnippets.push(this.snippets[i]._id);
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
