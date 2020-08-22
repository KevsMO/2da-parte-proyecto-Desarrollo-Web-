import { Component, OnInit } from '@angular/core';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { MyserviceService } from '../../myservice.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    public router: Router
  ) { }

  patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  formularioRegistro = new FormGroup({
    primerNombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    primerApellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.patronCorreo)]),
    nickName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    verificarPassword: new FormControl('', [Validators.required])
  });

  registarUsuario() {
    this.authService.registrarse(this.formularioRegistro.value).subscribe(
      (res) => {
        if (res.result) {
          this.formularioRegistro.reset();
          this.router.navigate(['login-register']); 
        }
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.patronCorreo)]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
  });

  loginUsuario() {
    this.authService.ingresar(this.formularioLogin.value);
  }

  ngOnInit(): void { }

  regionVisible:string = this.myService.regionVisible;

  verRegistro(){
    this.regionVisible = 'registro';
  }

  verLogin(){
    this.regionVisible = 'login';
  }

  iconos = [faEyeSlash, faEyeSlash, faEyeSlash];
  inputs:string[] = ['password', 'password', 'password'];
  clases:string[] = ['fa-eye-slash', 'fa-eye-slash', 'fa-eye-slash'];
  
  faEyeFuncion(id){
    this.iconos[id] = faEye;
    this.inputs[id] = 'text';
    this.clases[id] = 'fa-eye';
  }

  faEyeSlashFuncion(id){
    this.iconos[id] = faEyeSlash;
    this.inputs[id] = 'password';
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

  iconoLogin(){
    if(this.iconos[2] == faEyeSlash){
      this.faEyeFuncion(2);
    } else {
      this.faEyeSlashFuncion(2);
    }
  }
}