import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HandlerServiceService } from './handler-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //ATRIBUTOS
  //Base de la url que se usan para los endpoints, contiene la dirección al servidor
  urlBase:string = "https://s5-ceatic.ujaen.es"
  //Segunda parte de la url, contiene la versión. Como esta parte se comparte, cuando hay algún cambio en la versión de la api con cambiar esto va bien
  urlApiVersion:string = "/test/api/v1"

  //CONSTRUCTOR
  constructor(private httpClient: HttpClient, private handlerService:HandlerServiceService) { }

  //--- Métodos privados ---

  /**
   * Genera la URL completa para la petición, recibe como parámetro el endpoint.
   */
  getFullUrl(endpoint: string): string {
    return this.urlBase + this.urlApiVersion + endpoint;
  }

  /**
   * Función que genera  y devuelve las cabeceras genéricas para las llamadas API.
   * El parámetro customContentType sirve para cambiar el tipo de contenido, se usa para los posts con imágenes.
   * El parámetro customHeaders permite poner cabeceras extra en caso de que hagan falta.
   */
  private getHeaders(customContentType?: string, customHeaders?: { [key: string]: string }): HttpHeaders {
    
    let headers = new HttpHeaders();

    if(customContentType){
      headers = headers.set('Content-Type', customContentType);
    }

    // En caso de que se tengan que añadir 
    if (customHeaders) {
        Object.keys(customHeaders).forEach(key => {
            headers = headers.set(key, customHeaders[key]);
        });
    }
    return headers;
  }

  //--- Métodos HTTP ---
  /**
   * IMPORTANTE: los métodos HTTP genéricos devuelven un Observable.
   * De esta forma, los resultados de los misos pueden ser manejados por los
   * servicios que los invocan utilizando pipe, suscribe y ese tipo de funcionalidades.
   * La estructura de los métodos http es siempre la misma:
   * 1.- Se define la url, headers y body.
   * 2.- Se define la petición.
   * 3.- Si auth es true, se envían las cookies con la petición.
   * 4.- Se ejecuta la petición, se enlaza con un pipe para que capture un error en caso de que sea errónea.
   * 5.- En caso se error, se delega al handleService con el error y la petición original.
   */

  /**
   * Petición GET genérica.
   * Por defecto no necesita autorización.
   */
  httpGet<T>(endpoint: string, auth: boolean = false, showGenericError: boolean = true, customContentType?: string, customHeaders?: { [key: string]: string }): Observable<T> {
    const url = this.getFullUrl(endpoint);
    const headers = this.getHeaders(customContentType, customHeaders);
    const getRequest = () => this.httpClient.get<T>(url, { headers, withCredentials:auth}); 
    return getRequest().pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handlerService.handleHttpError(error, getRequest(), showGenericError);
      })
    );
  }

  /**
   * Petición POST genérica.
   * Por defecto si necesita autorización.
   * Requiere un body.
   */
  httpPost<T>(endpoint: string, body: any, auth: boolean = true, showGenericError: boolean = true, customContentType?: string, customHeaders?: { [key: string]: string }): Observable<T> {
    const url = this.getFullUrl(endpoint);
    const headers = this.getHeaders(customContentType, customHeaders);
    const postRequest = () => this.httpClient.post<T>(url, body, { headers, withCredentials:auth});
    return postRequest().pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handlerService.handleHttpError(error, postRequest(), showGenericError);
      })
    );
  }

  /**
   * Petición DELETE genérica.
   * Por defecto si necesita autorización.
   */
  httpDelete<T>(endpoint: string, auth: boolean = true,  showGenericError: boolean = true, customContentType?: string, customHeaders?: { [key: string]: string }): Observable<T> {
    const url = this.getFullUrl(endpoint);
    const headers = this.getHeaders(customContentType, customHeaders); 
    const deleteRequest = () => this.httpClient.delete<T>(url, { headers, withCredentials:auth });
    return deleteRequest().pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handlerService.handleHttpError(error, deleteRequest(), showGenericError);
      })
    );
  }

  /**
   * Petición PUT genérica.
   * Por defecto si necesita autorización.
   * Requiere un body.
   */
  httpPut<T>(endpoint: string, body: any, auth: boolean = true,  showGenericError: boolean = true, customContentType?: string, customHeaders?: { [key: string]: string }): Observable<T> {
    const url = this.getFullUrl(endpoint);
    const headers = this.getHeaders(customContentType, customHeaders); 
    const putRequest = () => this.httpClient.put<T>(url, body, { headers, withCredentials:auth });
    return putRequest().pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handlerService.handleHttpError(error, putRequest(), showGenericError);
      })
    );
  }

}
