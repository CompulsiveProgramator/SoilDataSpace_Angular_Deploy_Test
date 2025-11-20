import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../../../../core/auth/services/login.service';
import { CongressFormComponent } from '../../components/congress-form/congress-form.component';

@Component({
	selector: 'app-congresses',
	standalone: false,
	templateUrl: './congresses.component.html',
	styleUrl: './congresses.component.css'
})
export class CongressesComponent {
	//ATRIBUTOS
	@ViewChild(CongressFormComponent) congressFormRef!: CongressFormComponent; //Referencia al componente de formulario de noticias
	isCreateCongressVisible = false; //Variable que dice si se puede ver el botón de crear noticia o no

	//CONSTRUCTOR
	constructor (private loginService: LoginService) {}

	//MÉTODOS
	ngOnInit(): void {
		this.isCreateCongressVisible = this.loginService.checkPermissions("ROLE_MARKETING")

		this.loginService.evento$.subscribe((msg) => {
			this.isCreateCongressVisible = this.loginService.checkPermissions("ROLE_MARKETING")
		})
	}

	/**
	 * Método que abre el formulario de noticias
	 */
	openCongressForm() {
		this.congressFormRef.showModal();
    }
}
