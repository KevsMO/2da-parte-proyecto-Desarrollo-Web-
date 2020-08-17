import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnInit(): void {
  }

  verRegistro(){
    this.myService.regionVisible = 'registro';
  }

  verLogin(){
    this.myService.regionVisible = 'login';
  }

  public isCollapsed = true;

  filaCaracteristicas = [
    {
      informaciones: [
        {
          titulo: 'Planes Accesibles',
          texto: 'Contamos con excelentes planes a un bajo precio para que puedas realizar más y más proyectos!',
          imagen: '../../../assets/images/hero-landing.png'
        },
        {
          titulo: 'Creación de Carpetas',
          texto: 'Puedes crear una o varias carpetas para que tus proyectos estén bien organizados y los encuentres fácilmente!',
          imagen: '../../../assets/images/hero-landing.png'
        },
        {
          titulo: 'Sintaxis Coloreada',
          texto: 'Con el sistema de sintaxis coloreada, puedes identificar de forma rápida las expresiones de los lenguajes que estas utilizando!',
          imagen: '../../../assets/images/hero-landing.png'
        }
      ]
    },
    {
      informaciones: [
        {
          titulo: 'Snippets de Código',
          texto: 'Puedes crear Snippets de código para que puedas reutilizarlos cuando quieras, ahorrándote tiempo y trabajo!',
          imagen: '../../../assets/images/hero-landing.png'
        },
        {
          titulo: 'Descargar Archivos',
          texto: 'También tienes la posibilidad de descargar los archivos de tus proyectos con las extensiones respectivas. Así puedes llevar tu código aún sin Internet!',
          imagen: '../../../assets/images/hero-landing.png'
        },
        {
          titulo: 'Full Responsive',
          texto: 'No importa desde que dispositivo estés trabajando. La plataforma se adapta a cualquier tamaño de pantalla!',
          imagen: '../../../assets/images/hero-landing.png'
        }
      ]
    }
  ]

  about() {
    this.myService.mostrarElementosNav = true;
  }
}