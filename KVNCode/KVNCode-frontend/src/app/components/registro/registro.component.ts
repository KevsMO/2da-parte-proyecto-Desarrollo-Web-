import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../myservice.service';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

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