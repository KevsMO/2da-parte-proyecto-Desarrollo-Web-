import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  endpoint: string = 'http://localhost:4321/usuario';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private httpClient:HttpClient,
    public router: Router
  ) { }

  // Registrarse (Crear usuario)
  registrarse(usuario):Observable<any> {
    return this.httpClient.post(`${this.endpoint}/registrarse`, usuario)
    .pipe(catchError(this.handleError))
  }

  // Ingresar
  ingresar(usuario) {
    return this.httpClient.post<any>(`${this.endpoint}/ingresar`, usuario).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        this.obtenerUnUsuario(res.msg._id).subscribe(
          (res) => {
            this.currentUser = res;
            this.router.navigate(['dashboard/' + res.msg._id]);
          },
          (error) => {
          }
        );
      }
    );
  }

  // Obtener perfil de usuario
  obtenerUnUsuario(id): Observable<any> {
    let url = `${this.endpoint}/${id}`;
    return this.httpClient.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Actualizar el plan de un usuario
  actualizarPlan(id, plan): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${id}/actualizar-plan`, plan);
  }

  //Actualizar un usuario
  actualizarUsuario(id, datos): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${id}`, datos);
  }

  //Crear un snippet del usuario
  crearSnippet(id, datos): Observable<any> {
    return this.httpClient.post(`${this.endpoint}/${id}/snippet/crear-snippet`, datos);
  }

  //obtener un snippet del usuario
  obtenerSnippet(idUsuario, idSnippet): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/${idUsuario}/snippet/${idSnippet}`);
  }

  //Actualizar un snippet del usuario
  actualizarSnippet(idUsuario, idSnippet, datos): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${idUsuario}/snippet/${idSnippet}`, datos);
  }

  //Eliminar un snippet del usuario
  eliminarSnippet(idUsuario, idSnippet): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${idUsuario}/snippet/${idSnippet}`);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeTokenID = localStorage.removeItem('datos');
    if ((removeToken == null) && (removeTokenID == null)) {
      this.router.navigate(['']);
    }
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
