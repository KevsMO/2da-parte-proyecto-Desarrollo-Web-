import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  regionVisible:string = 'login';

  htmlService: any = '';
  cssService: any = '';
  jsService: any = '';

  setValores(html, css, js){
    this.htmlService = html;
    this.cssService = css;
    this.jsService = js;
  }

  mostrarElementosNav:boolean = true;
}
