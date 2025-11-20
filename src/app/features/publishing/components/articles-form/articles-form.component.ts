import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ArticlesErrorMessages, ArticlesService } from '../../services/articles.service';
import { ArticlesInterface } from '../../interfaces/articles-interface';

@Component({
  selector: 'app-articles-form',
  standalone: false,
  templateUrl: './articles-form.component.html',
  styleUrl: './articles-form.component.css'
})

export class ArticlesFormComponent implements OnInit {
  //ATRIBUTOS
  isVisible!: boolean; //Define si se puede ver el formulario o no
  articleForm!:FormGroup; //Controla el formulario
  errorMessage!: string | null;
  file!: File | null; //El arachivo que se ha escogido, se usa para codificarlo a base64
  fileName: string | null = null; //El nombre del archivo que se ha escogido
  fileType!: string; //El tipo del archivo que se ha escogido
  errorActive!:boolean; //True cuando ha ocurrido un error, controla el texto de error

  //CONSTRUCTOR
  //fb es el constructor de formulatio
  constructor(private fb: FormBuilder, private articlesService: ArticlesService) {}

  //METODOS

  //Cuando se inicializa el componente, se crea el controlador del formulario
  ngOnInit(): void {
	this.isVisible = false;
	this.errorActive = false;
	this.articleForm = this.fb.group({
		id: [''], //Aquí el id va vacío porque no hace falta mandar el id de noticia al crear una nueva
		title: ['', Validators.required],
		subtitle: [''],
		author: ['', Validators.required],
		link: ['', Validators.required],
		image: [null, Validators.required] // El control de archivos se maneja de forma diferente
	});
  }

  //--- Métodos visuales ---

  /**
   * Muestra el modal
   */
  showModal(){
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
    this.articleForm.reset();
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
		const formValidation = this.articlesService.formValidation(this.articleForm, this.fileName, this.fileType)
		if (formValidation.isValid){
			this.articlesService.createArticle( await this.articlesService.parseFormDataToarticlesInterface(this.articleForm,this.file));
			this.closeModal()
		} else {
			//Si falla la validación del formulario propia o la del objeto newsform devuelve el error
			this.showError(formValidation.errorCode);
		}
	}
}
