import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, Output, EventEmitter, Input, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../core/auth/services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: false,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
	@ViewChild('loginBtnHeader') loginBtnHeader!: ElementRef; // Boton de iniciar sesión o cerrar sesión
	@ViewChild('loginModal') loginModal!: ElementRef; // Modal de login
	@ViewChild('profileModal') profileModal!: ElementRef; // Modal para ver el perfil del usuario :)
	@ViewChild('loginForm') loginForm!: NgForm;
	@ViewChild('loginMessage') loginMessage!: ElementRef; // Mensaje de error en el formulario
	@ViewChild('toast') toast!: ElementRef
	@ViewChild('toastMessage') toastMessage!: ElementRef
	username: string = "" // El nombre del usuario que rellena el formulario
	logeado: boolean = false
	profileModalVisible: boolean = false

	/**
	 * Constructor de la clase
	 * @param renderer 
	 * @param loginService 
	 */
	constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router) {
		
	}

	/**
	 * Función llamada cuando se construye el componente por primera vez
	 */
	ngOnInit(): void {
		this.loginService.getAuthorization().subscribe( ok => {
			if(ok){
				this.username = localStorage.getItem('username') ?? ""
				this.logeado = true
				this.loginService.emitirEvento("Se inicia sesión")
			}else{
				this.logeado = false
				this.loginService.emitirEvento("Se cierra la sesión")
			}
		})
	}

	// Lógica asociada al botón de login, que muestra el modal
	startLoginProcess(){
		// Abrir modal
		this.renderer.removeClass(this.loginModal.nativeElement, 'hidden')
		this.renderer.addClass(this.loginModal.nativeElement, 'flex')
		this.renderer.setStyle(document.body, 'overflow', 'hidden');

		// Limpiar formulario y mensaje de error
		this.loginForm.reset(); // vacía usuario y contraseña
		this.renderer.addClass(this.loginMessage.nativeElement, 'hidden') // oculta mensaje de error
	}
	
	// Función llamada cuando el botón del formulario de submit se ha clicado
	loginRequest(){
		this.username = this.loginForm.value.username
		const password: string = this.loginForm.value.password

		this.loginService.loginFunction(this.username, password).subscribe( ok =>
			{
				if (ok) {
					this.logeado = true
					this.loginService.emitirEvento("Se logea correctamente")
					// Se mete en el local storage los datos necesarios:
					localStorage.setItem('username', this.username)

					// Cerrar modal
					this.clickOnCloseLoginModal()

					this.showWelcomeToast()

					this.renderer.addClass(this.loginMessage.nativeElement, 'hidden')
				} else {
					// Mostrar mensaje de error
					this.loginMessage.nativeElement.textContent = "Usuario o contraseña incorrectos";
					this.renderer.removeClass(this.loginMessage.nativeElement, 'hidden')
				}
			}
		)
	}

	/**
	 * Muestra un toast de bienvenida cuando se inicia sesión correctamente
	 */
	showWelcomeToast() {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-emerald-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-cyan-600')

		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', `Bienvenido, ${this.username}`);

		setTimeout(() => {
			this.renderer.addClass(this.toast.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.toast.nativeElement, 'opacity-100')
			setTimeout(() => {
				this.renderer.removeClass(this.toast.nativeElement, 'bg-gradient-to-r')
				this.renderer.removeClass(this.toast.nativeElement, 'from-emerald-600')
				this.renderer.removeClass(this.toast.nativeElement, 'to-cyan-600')
			}, 1500)
		}, 2500);

		
	}

	/**
	 * Muestra un toast cuando se cierra la sesión
	 */
	showLogoutToast() {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-red-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-red-800')
		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', `Sesión cerrada`);

		setTimeout(() => {
			this.renderer.addClass(this.toast.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.toast.nativeElement, 'opacity-100')
			setTimeout(() => {
				this.renderer.removeClass(this.toast.nativeElement, 'bg-gradient-to-r')
				this.renderer.removeClass(this.toast.nativeElement, 'from-red-600')
				this.renderer.removeClass(this.toast.nativeElement, 'to-red-800')
			}, 1500)
		}, 2500);
	}

	/**
	 * Muestra el modal del perfil
	 */
	showProfileModal() {
		this.profileModalVisible = !this.profileModalVisible
		
		if(this.profileModalVisible){
			// Animación de aparición
			this.renderer.removeClass(this.profileModal.nativeElement, 'hidden')
			this.renderer.removeClass(this.profileModal.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.profileModal.nativeElement, 'scale-95')
			this.renderer.addClass(this.profileModal.nativeElement, 'block')
			this.renderer.addClass(this.profileModal.nativeElement, 'opacity-100')
			this.renderer.addClass(this.profileModal.nativeElement, 'scale-100')
		}else{
			// Animación de desaparición
			this.clickOnCloseProfileModal()
		}
	}

	/**
	 * Cierra el modal del perfil
	 */
	clickOnCloseProfileModal() {
		this.profileModalVisible = false
		// Animación de desaparición
		this.renderer.removeClass(this.profileModal.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.profileModal.nativeElement, 'scale-100')
		this.renderer.addClass(this.profileModal.nativeElement, 'opacity-0')
		this.renderer.addClass(this.profileModal.nativeElement, 'scale-95')

		// Esperar a que termine la transición antes de ocultar
		setTimeout(() => {
			this.renderer.addClass(this.profileModal.nativeElement, 'hidden')
			this.renderer.removeClass(this.profileModal.nativeElement, 'block')
		}, 150)
	}

	/**
	 * Función llamada cuando se hace clic en el botón de cerrar sesión
	 */
	closeSession(){
		this.clearLocalStorage()
		this.logeado = false
		this.loginService.emitirEvento("Se cierra la sesión")
		this.loginService.logout(); //Llamada para cerrar sesión
		this.clickOnCloseProfileModal()
		this.router.navigate(['/home']);
		this.showLogoutToast()
	}

	clearLocalStorage(){
		localStorage.removeItem('username')
		this.loginService.removePermissions()
	}

	// Cerrar modal con la X
	clickOnCloseLoginModal(){
		this.renderer.addClass(this.loginModal.nativeElement, 'hidden')
		this.renderer.removeClass(this.loginModal.nativeElement, 'flex')
		this.renderer.removeStyle(document.body, 'overflow');
	}

	/**
	 * Detecta clics globales para cerrar el modal de perfil si se hace clic fuera
	 */
	@HostListener('document:mousedown', ['$event'])
	onClickOutside(event: MouseEvent) {
		// Si el modal está visible y el clic fue fuera de él
		if (
			this.profileModal &&
			!this.profileModal.nativeElement.contains(event.target) &&
			!event.composedPath().some((el: any) => el?.classList?.contains('user-button'))
		) {
			this.clickOnCloseProfileModal();
		}
	}
}
