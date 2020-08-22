import { Component, OnInit, ViewChild, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { faUserCircle, faChevronDown, faLaptopCode, faFolder, faProjectDiagram, faStickyNote, faUserCog, faDollarSign, faBookReader, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { DesarrolloComponent } from '../desarrollo/desarrollo.component'
import { CarpetasComponent } from '../carpetas/carpetas.component'
import { ProyectosComponent } from '../proyectos/proyectos.component'
import { SnippetsComponent } from '../snippets/snippets.component'

import { MyserviceService } from '../../myservice.service'
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild(DesarrolloComponent) desarrollo: DesarrolloComponent;
  @ViewChild(CarpetasComponent) carpetas: CarpetasComponent;
  @ViewChild(ProyectosComponent) proyectos: ProyectosComponent;
  @ViewChild(SnippetsComponent) snippets: SnippetsComponent;

  usuarioActual:any = {};
  constructor(
    protected myService: MyserviceService,
    public authService: UsuariosService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.obtenerUnUsuario(id).subscribe(res => {
      this.usuarioActual = res.msg;
      let datos = {_id: res.msg._id, nickName: res.msg.nickName, plan: res.msg.plan};
      localStorage.setItem('datos', JSON.stringify(datos));
    });
  }

 cerrarSesion() {
  this.authService.doLogout();
}

  pestaniaActiva;

  ngOnInit(): void {
    this.cambiarPestania(3);
  }

  ngOnDestroy() {
    this.myService.mostrarElementosNav = true;
  }
  
  faUserCircle = faUserCircle;
  faChevronDown = faChevronDown;
  faLaptopCode = faLaptopCode;
  faFolder = faFolder;
  faProjectDiagram = faProjectDiagram;
  faStickyNote = faStickyNote;
  faUserCog = faUserCog;
  faDollarSign = faDollarSign;
  faBookReader = faBookReader;
  faChevronLeft = faChevronLeft;

  ngAfterViewInit() { }
  
  collapsedMenu:string = '';

  expandirMenu:string = 'expandir';
  colapsarBtn() {
    if(this.expandirMenu == 'expandir') {
      this.expandirMenu = 'colapsar';
      this.collapsedMenu = 'collapsed';
    } else {
      this.expandirMenu = 'expandir';
      this.collapsedMenu = '';
    }
  }

  expandirMobile:string = 'colapsar'; 
  colapsarBtnMobile() {
    if(this.expandirMobile == 'expandir') {
      this.expandirMobile = 'colapsar';
      this.collapsedMenu = '';
    } else {
      this.expandirMobile = 'expandir';
      this.collapsedMenu = 'mob-menu-opened';
    }
  }

  valoresPlaceholder = ['', 'Escribe el nombre de la carpeta que buscas', 'Escribe el nombre del proyecto que buscas', 'Escribe el nombre del snippet que buscas', '', '', '']

  placeholderBusqueda = this.valoresPlaceholder[1];
  
  cambiarPestania(id){
    if (this.pestaniaActiva == 0 && id != 0) {this.desarrollo.guardarValorEditores();}
    this.pestaniaActiva = id;
    this.myService.mostrarElementosNav = false;
    this.myService.planesDesdeLanding = false;
    this.placeholderBusqueda = this.valoresPlaceholder[id];  
  }

  anchoVentana = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.anchoVentana = event.target.innerWidth;
  }

  llenarSearch(value) {
    if (this.pestaniaActiva == 1) this.carpetas.search = value;
    else if (this.pestaniaActiva == 2) this.proyectos.search = value;
    else if (this.pestaniaActiva == 3) this.snippets.search = value;
  }

  cargarIframePadre(){
    this.desarrollo.cargarJS();
  }
}