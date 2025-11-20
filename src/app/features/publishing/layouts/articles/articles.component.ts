import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../../../../core/auth/services/login.service';
import { ArticlesFormComponent } from '../../components/articles-form/articles-form.component';

@Component({
  selector: 'app-articles',
  standalone: false,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
	//ATRIBUTOS
	@ViewChild(ArticlesFormComponent) articlesFormRef!: ArticlesFormComponent; //Referencia al componente de formulario de noticias
	isCreateArticlesVisible = false; //Variable que dice si se puede ver el botón de crear noticia o no

	//CONSTRUCTOR
	constructor (private loginService: LoginService) {}

	//MÉTODOS
	ngOnInit(): void {
		this.isCreateArticlesVisible = this.loginService.checkPermissions("ROLE_MARKETING")

		this.loginService.evento$.subscribe((msg) => {
			this.isCreateArticlesVisible = this.loginService.checkPermissions("ROLE_MARKETING")
		})
	}

	/**
	 * Método que abre el formulario de noticias
	 */
	openArticlesForm() {
		this.articlesFormRef.showModal();
    }
}
