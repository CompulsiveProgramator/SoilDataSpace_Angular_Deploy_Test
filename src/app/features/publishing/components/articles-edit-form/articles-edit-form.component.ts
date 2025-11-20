import { Component, Input, OnInit } from '@angular/core';
import { ArticlesInterface } from '../../interfaces/articles-interface';
import { ArticlesErrorMessages, ArticlesService } from '../../services/articles.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-articles-edit-form',
	standalone: false,
	templateUrl: './articles-edit-form.component.html',
	styleUrl: './articles-edit-form.component.css'
})
export class ArticlesEditFormComponent implements OnInit {
	//ATRIBUTOS
	//--- Atributos de entrada ---
	@Input() articleItem!: ArticlesInterface;
	@Input() articleIndex!: number;
	isVisible!: boolean;
	articleForm!:FormGroup; //Objeto de formulario
	errorMessage!:string | null;
	errorActive!:boolean
	selectedCategory!: string; //String con la categoría seleccionada
	categoryList!: string[]; //Lista de categorías que se coge del articleService
	//--- Atributos de la imagen ---
	file!: File | null; 
	fileName: string | null = null; 
	fileType!: string; 

	//CONSTRUCTOR
	constructor(private fb: FormBuilder, private articleService: ArticlesService) {}

	//MÉTODOS
	ngOnInit(): void {
		this.isVisible = false;
		this.errorActive = false;
	}

	//-- Métodos privados
	/**
	 * Resetea el formulario, poniendo los datos de la noticia que se quiere editar
	 */
	public resetForm(){
		this.articleForm = this.fb.group({ //Por defecto toman los valores del articleItem del modal de donde cuelga 
			id: [this.articleItem.id, Validators.required],
			title: [this.articleItem.title, Validators.required],
			subtitle: [this.articleItem.subtitle],
			author: [this.articleItem.author, Validators.required],
			link: [this.articleItem.link, Validators.required],
			image: [null]
		});
	}

	//--- Métodos visuales ---

	/**
	 * Muestra el modal
	 */
	showModal(){
		this.resetForm()
		this.isVisible = true;
		document.body.style.overflow = 'hidden';
	}

	/**
	 * Función que muestra el error cuando no se cumplen las validaciones
	 */
	showError(errorCode: ArticlesErrorMessages | null){
		this.errorMessage = errorCode
		this.errorActive = true;
		}

	hideError(){
		this.errorActive = false;
	}

	/**
	 * Esconde el modal y resetea el formulario*/
	closeModal(){
		this.isVisible = false;
		this.hideError();
		document.body.style.overflow = '';
		this.fileName = null;
		this.resetForm();
	}

	//--- Métodos del formulario

	/**
	 * Se lanza cuando se añade un nuevo archivo, sirve para cambiar el texto
	 * del botón de subir archivo y quede pero que bien bonito
	 */
	onFileSelected(event: any): void {
		const file: File | null = event.target.files[0];
		if (file) {
			this.file = file;
			this.fileName = file.name;
			this.fileType = file.type;
		} else {
			this.file = null
			this.fileName = null;
			this.fileType = "";
		}
	}

	/**
	 * Llamada API que sube el formulario, es asíncrona, espera a que la llamada desde el servicio
	 * se complete para cerrar el modal*/
	async onSubmit() : Promise<void> {
		const formValidation = this.articleService.formValidation(this.articleForm,this.fileName,this.fileType)
		if (formValidation.isValid){
			this.articleService.editArticles( await this.articleService.parseFormDataToarticlesInterface(this.articleForm,this.file),this.articleIndex);
			this.closeModal()
		} else {
			this.showError(formValidation.errorCode);
		}
	}
}
