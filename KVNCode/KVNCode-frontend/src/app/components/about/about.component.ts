import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnInit(): void {
    this.visualizarNav(this.myService.mostrarElementosNav)
  }

  verRegistro(){
    this.myService.regionVisible = 'registro';
  }

  verLogin(){
    this.myService.regionVisible = 'login';
  }

  public isCollapsed = true;

  mostrarNav:boolean;
  paddingTop:string;
  tamanio:string;

  visualizarNav(valor) {
    if (valor){
      this.paddingTop = 'padding-top: 72px; min-height: 100vh; overflow: auto;';
      this.tamanio = 'height: calc(100vh - 72px);';
    }
    else {
      this.paddingTop = '';
      this.tamanio = 'min-height: 88.48vh; width: 100%; overflow: auto;';
    }
    this.mostrarNav = valor;
  }
}
