import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { catchError, map, of,tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	// Url del backend
	userPermissions:string[] = []
	permissions = ["ROLE_MARKETING", "ROLE_USER"]
	private evento = new Subject<string>()
	evento$ = this.evento.asObservable()

	emitirEvento(mensaje: string) {
		this.evento.next(mensaje)
	}

	constructor(private apiService: ApiServiceService) { 
	}

	/**
	 * Función para hacer un status
	 * @returns True si tenemos un token como cookie segura válido
	 */
	getAuthorization(): Observable<boolean>
	{
		return this.apiService.httpGet<any>('/user/public/status', true, false).pipe(
			map(response => {
				const status = response.message_status;

				if (status) {
					this.userPermissions = response.permissions

					return true;
				} else {
					return false;
				}
			}),
			catchError(err => {
				console.error("Error en getAuthorization:", err);
				return of(false);
			})
		);
	}

	/**
	 * Función para hacer login en la web
	 * @param username El nombre de usuario
	 * @param password Su contraseña
	 * @returns [true, token] si se hizo login correctamente, o [false, ""] si no
	 */
	loginFunction(username: string, password: string): Observable<boolean>{
		const body = JSON.stringify({
				username : username,
				password : password
			})

		return this.apiService.httpPost<any>('/user/public/auth/login', body, true, false,'application/json').pipe(
        // 1. Manejar la respuesta del login
        tap(response => {
            // Guardamos los permisos en la propiedad de la clase
            this.userPermissions = response.permissions ?? ""; 
            
        }),
        // 2. Cambiar al Observable de getAuthorization
        // switchMap toma el resultado del login (aunque no se use directamente) y 
        // pasa al nuevo Observable (getAuthorization) para que sea el siguiente en la cadena.
        switchMap(() => this.getAuthorization()),
        // 3. getAuthorization devuelve un booleano, que se convierte en el resultado final 
        // de loginFunction (true si autorizado, false si no)
        
        // 4. Manejo de errores
        catchError(err => {
            console.error("Error en loginFunction o getAuthorization (dentro de switchMap):", err);
            // Devuelve un Observable de 'false' si falla la API de login o getAuthorization
            return of(false); 
        })
    );
	}

	/**
	 * logout
	 */
	logout() {
		this.apiService.httpPost<any>(`/user/public/auth/logout`,{}).subscribe(
		data => {
			if(data.status=200){
				console.log('Se ha cerrado sesión correctamente');
			}
		}
		);
	}

	/**
	 * Función que se llama cuando se quiere comprobar si un permiso dado, está abjudicado
	 * al usuario logeado, y si es así desde el front se renderizará lo correspondiente ;)
	 * @param permission El permiso que se quiere consultar del usuario
	 * @returns True si el permiso le pertenece al usuario
	 */
	checkPermissions(permission: string): boolean{
		if(this.userPermissions.includes(permission)){
			return true
		}else{
			return false
		}
	}

	/**
	 * Función que elimina los permisos del local storage, porque se cierra la sesión
	 */
	removePermissions(){
		this.userPermissions = []
	}
}
