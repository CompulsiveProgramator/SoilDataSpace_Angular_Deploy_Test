import { Component, Input, ViewChild } from '@angular/core';
import { ArticlesInterface } from '../../interfaces/articles-interface';
import { SafeUrl } from '@angular/platform-browser';
import { ArticlesService } from '../../services/articles.service';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { ImageModalComponent } from '../../../../shared/components/image-modal/image-modal.component';

@Component({
	selector: 'app-articles-grid-card',
	standalone: false,
	templateUrl: './articles-grid-card.component.html',
	styleUrl: './articles-grid-card.component.css'
})
export class ArticlesGridCardComponent {
	//ATRIBUTOS
	@Input() articlesItem!: ArticlesInterface;
	@Input() articlesIndex!: number;
	finalImage: File | string = '';
	@ViewChild(ImageModalComponent) imageModalRef!: ImageModalComponent;
	
	
	//CONSTRUCTOR
	constructor(private articlesService: ArticlesService, private apiService: ApiServiceService) { }

	//MÉTODOS

	/**
	 * Inicializar carta
	 * */
	ngOnInit() {
		// Lógica para determinar la imagen por defecto
		this.finalImage = (this.apiService.urlBase + this.apiService.urlApiVersion + this.articlesItem.image) || this.articlesService.defaultArticlesImage
	}

	openModal(){
		this.imageModalRef.showModal();
	}
}
