import { Component, Input, OnInit } from '@angular/core';
import { CongressInterface } from '../../interfaces/congress-interface';
import { congressErrorMessages, CongressService } from '../../services/congress.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-congress-edit-form',
	standalone: false,
	templateUrl: './congress-edit-form.component.html',
	styleUrl: './congress-edit-form.component.css'
})
export class CongressEditFormComponent implements OnInit {
	//ATRIBUTOS
	//--- Atributos de entrada ---
	@Input() congressItem!: CongressInterface;
	@Input() congressIndex!: number;
	isVisible!: boolean;
	congressForm!:FormGroup; //Objeto de formulario
	errorMessage!:string | null;
	errorActive!:boolean
	selectedCategory!: string; //String con la categoría seleccionada
	categoryList!: string[]; //Lista de categorías que se coge del congresservice
	//--- Atributos de la imagen ---
	file!: File | null; 
	fileName: string | null = null; 
	fileType!: string; 

	//CONSTRUCTOR
	constructor(private fb: FormBuilder, private congressService: CongressService) {}

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
		this.congressForm = this.fb.group({ //Por defecto toman los valores del congressItem del modal de donde cuelga 
			id: [this.congressItem.id, Validators.required],
			title: [this.congressItem.title, Validators.required],
			subtitle: [this.congressItem.subtitle],
			author: [this.congressItem.author, Validators.required],
			link: [this.congressItem.link, Validators.required],
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
	showError(errorCode: congressErrorMessages | null){
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
		const formValidation = this.congressService.formValidation(this.congressForm,this.fileName,this.fileType)
		if (formValidation.isValid){
			this.congressService.editCongress( await this.congressService.parseFormDataToCongressInterface(this.congressForm,this.file),this.congressIndex);
			this.closeModal()
		} else {
			this.showError(formValidation.errorCode);
		}
	}
}
