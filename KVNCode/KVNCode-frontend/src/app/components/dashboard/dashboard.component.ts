import { Component, OnInit, ViewChild, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { faUserCircle, faChevronDown, faLaptopCode, faFolder, faProjectDiagram, faStickyNote, faUserCog, faDollarSign, faBookReader, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { DesarrolloComponent } from '../desarrollo/desarrollo.component'
import { CarpetasComponent } from '../carpetas/carpetas.component'
import { ProyectosComponent } from '../proyectos/proyectos.component'
import { SnippetsComponent } from '../snippets/snippets.component'
import { AboutComponent } from '../about/about.component'
import { MyserviceService } from '../../myservice.service'

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
  @ViewChild(AboutComponent) about: AboutComponent;

  cargarIframePadre(){
    this.desarrollo.cargarJS();
  }

  constructor(
    protected myService: MyserviceService
  ) {

  }

  pestaniaActiva = 4;

  ngOnInit(): void { }

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

  nombreUsuario = 'Usuario';
}