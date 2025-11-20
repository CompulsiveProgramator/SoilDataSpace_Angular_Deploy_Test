import { Component, Input, ViewChild } from '@angular/core';
import { CongressInterface } from '../../interfaces/congress-interface';
import { SafeUrl } from '@angular/platform-browser';
import { CongressService } from '../../services/congress.service';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { ImageModalComponent } from '../../../../shared/components/image-modal/image-modal.component';

@Component({
	selector: 'app-congress-grid-card',
	standalone: false,
	templateUrl: './congress-grid-card.component.html',
	styleUrl: './congress-grid-card.component.css'
})
export class CongressGridCardComponent {
	//ATRIBUTOS
	@Input() congressItem!: CongressInterface;
	@Input() congressIndex!: number;
	finalImage: File | string = '';
	@ViewChild(ImageModalComponent) imageModalRef!: ImageModalComponent;
	
	//CONSTRUCTOR
	constructor(private congressService: CongressService, private apiService: ApiServiceService) { }

	//MÉTODOS

	/**
	 * Inicializar carta
	 * */
	ngOnInit() {
		// Lógica para determinar la imagen por defecto
		this.finalImage = (this.apiService.urlBase + this.apiService.urlApiVersion + this.congressItem.image) || this.congressService.defaultCongressImage
	}

	openModal(){
		this.imageModalRef.showModal();
	}
}
