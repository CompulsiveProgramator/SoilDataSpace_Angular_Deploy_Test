import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError, concatMap, catchError, of, tap, delay} from 'rxjs';
import { ApiServiceService } from './api-service.service';
import { NotificationService } from '../../shared/services/notification.service';


@Injectable({
  providedIn: 'root'
})

/**
 * Clase manejador que se encarga de recibir errores de llamadas API. Se encarga de refrescar
 * el token actual en caso de que haya expirado
 */
export class HandlerServiceService {

  //CONSTRUCTOR
  //se usa un injector para evitar dependencias cíclicas
  constructor(private httpClient: HttpClient,private injector: Injector, private notificationService: NotificationService) { }

  //METODOS
  //--- Métodos privados ---
  /**
   * Función que hace una llamada http que refresca el token de acceso. Se llama en caso de error
   */
  private refreshToken(): Observable<any> {
      //TODO: HACER UNA LLAMADA HTTP PARA REFRESCAR EL TOKEN DE ACCESO
      return this.httpClient.post<any>(this.injector.get(ApiServiceService).urlBase + this.injector.get(ApiServiceService).urlApiVersion + `/user/public/auth/refreshToken`,{},{withCredentials: true});
  }
  /**
   * Se lanza cuando ocurre un error genérico. Estos errores recargan la página y muestran un
   * mensaje en un popup con el texto del error. Se lanza cuando o bien el error no es un 401
   * o si el intento de refreshtoken ha fallado
   */
  private genericError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = `Error ${error.status}: ${error.message}. Termina la ejecución.`;
    console.error(errorMessage);
    this.notificationService.showError(error.status.toString());
    return throwError(() => new Error(errorMessage));
  }

  //--- Métodos públicos ---
  /**
   * Método que intercepta un error HTTP. Recibe como parámetros la respuesta errónea del HTTP y qué llamada ha causado ese error.
   * En caso de que el error sea el 401 (TOKEN_EXPIRED) llama a la función refresh token que recarga el token de acceso.
   * Si el error es otro código, lanza un error genérico y termina.
   * Si hace la llamada de refrescar token y aun así da un error, entonces directamente termina. Como tal tiene 2 intentos.
   * El campo showGenericError sirve para controlar cuando se muestra el modal de error, por defecto es true. Sirve para casos
   * como el login y el status que no queremos que se muestren los errores explicitamente.
   */
  handleHttpError(error: HttpErrorResponse, originalRequest: Observable<any>, showGenericError: boolean = true): Observable<any> {
    if (error.status === 401) {
      //-- Error 401 ---
      console.warn("Error 401 interceptado. Iniciando proceso de reautenticación...");
      // Llama la función refreshToken para actualizar el token de acceso.
      // Se encadena con un pipe para que se vuelva a lanzar la peticion.
      return this.refreshToken().pipe(
          // Se usa concatMap para volver a lanzar la petición original en caso de que
          // la respuesta de refreshToken fuera exitosa.
          concatMap(() => {
            console.log("Token actualizado con éxito. Reintentando la petición original...");
            return originalRequest; 
          }),
          // Si el refreshToken da error, se hace un catchError para lanzar un error genérico
          // TODO: ESTO TIENE QUE REDIRIGIR AL LOGIN
          catchError(refreshError => {
              console.error("El reintento o el refresh token fallaron. Finalizando.");
              return showGenericError ? this.genericError(refreshError) : throwError(() => new Error(refreshError));
          })
      );
    } else {
      console.error(error.message);
      return showGenericError ? this.genericError(error) : throwError(() => new Error(error.message));
    }
  
  }
}
