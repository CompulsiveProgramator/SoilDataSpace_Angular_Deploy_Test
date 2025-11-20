import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private loginService: LoginService) {}

	canActivate(): Observable<boolean> {
		return this.loginService.getAuthorization().pipe(
			map(logeado => {
				if (logeado) return true;
				this.router.navigate(['/'], { fragment: 'home' });
				return false;
			})
		);
	}

}

