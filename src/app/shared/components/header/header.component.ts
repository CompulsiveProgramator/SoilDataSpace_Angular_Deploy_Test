import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../../core/auth/services/login.service';
import { ScreenSizes, ScreenSizeServiceService } from '../../services/screen-size-service.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent{
	openMenu = false;
	isLoggedIn: boolean = false
	//--- Responsive ---
	screenSize!:ScreenSizes;
	public readonly ScreenSizes = ScreenSizes; 

	constructor(private loginService: LoginService, private screenSizeService:ScreenSizeServiceService){
		this.isLoggedIn = this.loginService.checkPermissions("ROLE_MARKETING")

        this.loginService.evento$.subscribe((msg) => {
            this.isLoggedIn = this.loginService.checkPermissions("ROLE_MARKETING")
        })

		//--- Suscribirse al ScreenSizeService ---
		this.screenSizeService.currentScreenSize$
			.subscribe((size: ScreenSizes) => {
			this.screenSize = size;
		});
	}

	toggleMenu() {
		this.openMenu = !this.openMenu;
	}

	closeBurgerMenu() {
		this.openMenu = false;
	}

	@HostListener('document:click',['$event'])
	onClickOutside(event: MouseEvent) {
		if(!this.openMenu)
		{
			return
		}

		// Busca el elemento del menú solo si está visible
		const mobileMenu = document.querySelector('#mobileMenu');
		const dentroMenu = mobileMenu?.contains(event.target as Node);

		// También podrías proteger el botón hamburguesa
		const botonMenu = document.querySelector('#burgerMenuButton');
		const dentroBoton = botonMenu?.contains(event.target as Node);

		if (!dentroMenu && !dentroBoton) {
			this.closeBurgerMenu()
		}
	}
}
