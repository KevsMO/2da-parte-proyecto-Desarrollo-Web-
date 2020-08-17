import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.css']
})

export class DesarrolloComponent implements OnInit {
  
  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnInit(): void { }

  faBars = faBars;

  @ViewChild('htmlEditor') htmlEditor;
  @ViewChild('cssEditor') cssEditor;
  @ViewChild('jsEditor') jsEditor;
  @ViewChild('iframe') iframe: ElementRef;  

  @ViewChild('tdHtmlEditor') tdHtmlEditor: ElementRef;
  @ViewChild('tdCssEditor') tdCssEditor: ElementRef;
  @ViewChild('tdJsEditor') tdJsEditor: ElementRef;

  resizeSensor:any;

  ngAfterViewInit() {
    this.htmlEditor.getEditor().setOptions({
      wrap: true,
      autoScrollEditorIntoView: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });
    this.htmlEditor.mode = 'html';

    this.cssEditor.getEditor().setOptions({
      wrap: true,
      autoScrollEditorIntoView: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });
    this.cssEditor.mode = 'css';

    this.jsEditor.getEditor().setOptions({
      wrap: true,
      autoScrollEditorIntoView: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });
    this.jsEditor.mode = 'javascript';

    this.obtenerValorEditores();

    this.cargarIframe(false);

    this.resizeSensor = new ResizeSensor(this.tdHtmlEditor.nativeElement, () => {
      this.resizeEditores();
    });

    this.resizeSensor = new ResizeSensor(this.tdCssEditor.nativeElement, () => {
      this.resizeEditores();
    });

    this.resizeSensor = new ResizeSensor(this.tdJsEditor.nativeElement, () => {
      this.resizeEditores();
    });
  } 

  resizeEditores(){
    this.htmlEditor.getEditor().resize(true);
    this.cssEditor.getEditor().resize(true);
    this.jsEditor.getEditor().resize(true);
  }

  jsScript;
  cargarIframe(bandera){
    this.iframe.nativeElement.contentDocument.head.innerHTML  = '';
    this.iframe.nativeElement.contentDocument.head.innerHTML  += `<style>${this.cssEditor.value}</style>`;
    this.iframe.nativeElement.contentDocument.body.innerHTML  = this.htmlEditor.value;

    if(bandera){
      this.jsScript = this.iframe.nativeElement.contentDocument.createElement("script");
      this.jsScript.type = "text/javascript";
      this.jsScript.innerHTML = this.jsEditor.value;
      this.jsScript.id = "jsDesdeEditor";

      this.iframe.nativeElement.contentDocument.body.appendChild(this.jsScript);

      this.iframe.nativeElement.contentDocument.body.innerHTML  += `
        <script type="text/javascript" id="jsDesdeEditor">
          ${this.jsEditor.value}
        </script>
      `;
    }
  };

  cargarJS(){
    this.cargarIframe(true);
    this.cargarIframe(true);
  }

  anchoVentana = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.anchoVentana = event.target.innerWidth;
  }

  ventanaVisible = ['ventana-visible', '', ''];
  botonActivo = ['boton-activo', '', ''];
  ventanaActiva(id){
    for (let i = 0; i < this.ventanaVisible.length; i++) {
      if(i == id){
        this.ventanaVisible[i] = 'ventana-visible';
        this.botonActivo[i] = 'boton-activo';
      } else{
        this.ventanaVisible[i] = '';
        this.botonActivo[i] = '';
      }
    }
  }

  collapsedBtnGuardar:string = '';
  expandirGuardar:string = 'colapsar';
  colapsarBtnGuardar() {
    if(this.expandirGuardar == 'expandir') {
      this.expandirGuardar = 'colapsar';
      this.collapsedBtnGuardar = '';
    } else {
      this.expandirGuardar = 'expandir';
      this.collapsedBtnGuardar = 'menu-abierto';
    }
  }

  guardarValorEditores(){
    this.myService.setValores(this.htmlEditor.value, this.cssEditor.value, this.jsEditor.value);
  }

  obtenerValorEditores(){
    this.htmlEditor.value = this.myService.htmlService;
    this.cssEditor.value = this.myService.cssService;
    this.jsEditor.value = this.myService.jsService;
  }
}
// <h1 id="prueba">Hola</h1>

// h1{
//   margin-top: 20px;
// }

// function probando() {
//   let variable = document.getElementById("prueba");
//   variable.innerHTML += '. Que tal';
// }

// probando();