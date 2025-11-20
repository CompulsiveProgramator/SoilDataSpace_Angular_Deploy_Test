import { Component, HostListener } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesInterface } from '../../interfaces/articles-interface';
import { ViewChild } from '@angular/core';
import { ArticlesEditFormComponent } from '../articles-edit-form/articles-edit-form.component';
import { LoginService } from '../../../../core/auth/services/login.service';

@Component({
  selector: 'app-articles-grid',
  standalone: false,
  templateUrl: './articles-grid.component.html',
  styleUrl: './articles-grid.component.css'
})
export class ArticlesGridComponent {
	//ATRIBUTOS
	articlesList!: ArticlesInterface[]; //Lista de noticias, son de tipo newsInterface
	@ViewChild(ArticlesEditFormComponent) articlesEditForm!: ArticlesEditFormComponent; 
	hasMarketingPermission = false

	//CONSTRUCTOR
	constructor(private articlesService: ArticlesService, private loginService: LoginService) {
		this.hasMarketingPermission = this.loginService.checkPermissions("ROLE_MARKETING")

		this.loginService.evento$.subscribe((msg) => {
           	this.hasMarketingPermission = this.loginService.checkPermissions("ROLE_MARKETING")
        })

		this.articlesService.evento$.subscribe((msg) => {
			this.articlesList = this.articlesService.getAllArticles()
		})
	}

	//MÉTODOS
	ngOnInit(): void {
		this.articlesList = this.articlesService.getAllArticles();
	}

	onDelete(index: number){
		this.articlesService.deleteArticles(index)
	}

	onEdit(article: ArticlesInterface, index: number){
		this.articlesEditForm.articleIndex = index
		this.articlesEditForm.articleItem = article
		this.articlesEditForm.showModal()
	}
}
