import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEyeSlash, faEye, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons';

import { MyserviceService } from '../../myservice.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  ngOnInit(): void { }

  usuarioActual:any = {};

  patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  formEditPerfil = new FormGroup({
    primerNombre: new FormControl(
      {value: '', disabled: true},
      [Validators.required, Validators.minLength(3)]
    ),
    primerApellido: new FormControl(
      {value: '', disabled: true},
      [Validators.required, Validators.minLength(3)]
    ),
    email: new FormControl(
      {value: '', disabled: true},
      [Validators.required, Validators.pattern(this.patronCorreo)]
    ),
    nickName: new FormControl(
      {value: '', disabled: true},
      [Validators.required, Validators.minLength(4)]
    ),
    password: new FormControl(
      {value: '', disabled: true},
      [Validators.required, Validators.minLength(7)]
    ),
    verificarPassword: new FormControl(
      {value: '', disabled: true},
      [Validators.required]
    )
  });

  icoVisible = [];
  claseDisable = [];

  planUsuario:string;
  textoPlan:string;

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    private actRoute: ActivatedRoute
  ) {
    this.llenarArreglos();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.inicializar(id);
  }

  inicializar(id) {
    this.authService.obtenerUnUsuario(id).subscribe(res => {
      this.usuarioActual = res.msg;
      this.planUsuario = this.usuarioActual.plan;

      let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
      localStorage.setItem('datos', JSON.stringify(datos));

      this.formEditPerfil = new FormGroup({
        primerNombre: new FormControl(
          {value: this.usuarioActual.primerNombre, disabled: true},
          [Validators.required, Validators.minLength(3)]
        ),
        primerApellido: new FormControl(
          {value: this.usuarioActual.primerApellido, disabled: true},
          [Validators.required, Validators.minLength(3)]
        ),
        email: new FormControl(
          {value: this.usuarioActual.email, disabled: true},
          [Validators.required, Validators.pattern(this.patronCorreo)]
        ),
        nickName: new FormControl(
          {value: this.usuarioActual.nickName, disabled: true},
          [Validators.required, Validators.minLength(4)]
        ),
        password: new FormControl(
          {value: '', disabled: true},
          [Validators.required, Validators.minLength(7)]
        ),
        verificarPassword: new FormControl(
          {value: '', disabled: true},
          [Validators.required]
        )
      });
      
      this.infoPlan();
    });
  }

  actualizarDatos() {
    this.authService.actualizarUsuario(this.usuarioActual._id, this.formEditPerfil.value).subscribe(
      res => {
        this.inicializar(this.usuarioActual._id);
        window.alert('Datos actualizados!');
      },
      error => {
        window.alert(error.message);
      }
    );
  }

  infoPlan() {
    switch (this.planUsuario.toLowerCase()) {
      case 'gratis':
        this.textoPlan = "Plan: Gratis - Límite de 10 proyectos";
        break;
      case 'básico':
        this.textoPlan = "Plan: Básico - Límite de 50 proyectos";
        break;
      case 'full':
        this.textoPlan = "Plan: Full - Límite de 100 proyectos";
        break;
      case 'vip':
        this.textoPlan = "Plan: VIP - Sin límite de proyectos";
        break;
      default:
        break;
    }
  }

  faEdit = faEdit;
  faUndo = faUndo;

  iconos = [faEyeSlash, faEyeSlash];
  inputsPassword:string[] = ['password', 'password'];
  clases:string[] = ['fa-eye-slash', 'fa-eye-slash'];
  
  faEyeFuncion(id){
    this.iconos[id] = faEye;
    this.inputsPassword[id] = 'text';
    this.clases[id] = 'fa-eye';
  }

  faEyeSlashFuncion(id){
    this.iconos[id] = faEyeSlash;
    this.inputsPassword[id] = 'password';
    this.clases[id] = 'fa-eye-slash';
  }

  iconoRegistro(){
    if(this.iconos[0] == faEyeSlash){
      this.faEyeFuncion(0);
    } else {
      this.faEyeSlashFuncion(0);
    }
  }

  iconoRegistro2(){
    if(this.iconos[1] == faEyeSlash){
      this.faEyeFuncion(1);
    } else {
      this.faEyeSlashFuncion(1);
    }
  }

  llenarArreglos() {
    for (let i = 0; i < 5; i++) {
      this.claseDisable.push('deshabilitar');
      this.icoVisible.push('edit');
    }
  }

  funcionEditar(value, index) {
    if(value == 'editar'){
      this.icoVisible[index] = 'undo';
      this.claseDisable[index] = '';
    } else if(value == 'deshacer'){
      switch (index) {
        case 0:
          this.formEditPerfil.get('primerNombre').setValue(this.usuarioActual.primerNombre);
          break;
        case 1:
          this.formEditPerfil.get('primerApellido').setValue(this.usuarioActual.primerApellido);
          break;
        case 2:
          this.formEditPerfil.get('email').setValue(this.usuarioActual.email);
          break;
        case 3:
          this.formEditPerfil.get('nickName').setValue(this.usuarioActual.nickName);
          break;
        case 4:
          
          break;
        default:
          break;
      }
    }
  }

  habilitarContrasenias() {
    this.formEditPerfil.get('verificarPassword').enable();
    this.formEditPerfil.get('password').enable()
  }
}
