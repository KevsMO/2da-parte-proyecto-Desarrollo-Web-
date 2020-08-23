import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  endpoint: string = 'http://localhost:4321/carpeta';
  currentUser = {};

  constructor(private httpClient:HttpClient) { }

  //Crear un proyecto de una carpeta
  crearSnippet(id, datos): Observable<any> {
    return this.httpClient.post(`${this.endpoint}/${id}/proyecto/crear-proyecto`, datos);
  }

  //obtener proyectos de una carpeta
  obtenerProyectos(id): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/${id}/proyecto`);
  }

  //obtener un proyecto de una carpeta
  obtenerUnProyecto(idCarpeta, idProyecto): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/${idCarpeta}/proyecto/${idProyecto}`);
  }
}
