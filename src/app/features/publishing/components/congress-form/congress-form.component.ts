import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { congressErrorMessages, CongressService } from '../../services/congress.service';
import { CongressInterface } from '../../interfaces/congress-interface';

@Component({
  selector: 'app-congress-form',
  standalone: false,
  templateUrl: './congress-form.component.html',
  styleUrl: './congress-form.component.css'
})

export class CongressFormComponent implements OnInit {
  //ATRIBUTOS
  isVisible!: boolean; //Define si se puede ver el formulario o no
  congressForm!:FormGroup; //Controla el formulario
  errorMessage!: string | null;
  file!: File | null; //El arachivo que se ha escogido, se usa para codificarlo a base64
  fileName: string | null = null; //El nombre del archivo que se ha escogido
  fileType!: string; //El tipo del archivo que se ha escogido
  errorActive!:boolean; //True cuando ha ocurrido un error, controla el texto de error

  //CONSTRUCTOR
  //fb es el constructor de formulatio
  constructor(private fb: FormBuilder, private congressService: CongressService) {}

  //METODOS

  //Cuando se inicializa el componente, se crea el controlador del formulario
  ngOnInit(): void {
	this.isVisible = false;
	this.errorActive = false;
	this.congressForm = this.fb.group({
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
    this.congressForm.reset();
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
		const formValidation = this.congressService.formValidation(this.congressForm, this.fileName, this.fileType)
		if (formValidation.isValid){
			this.congressService.createCongress( await this.congressService.parseFormDataToCongressInterface(this.congressForm,this.file));
			this.closeModal()
		} else {
			//Si falla la validación del formulario propia o la del objeto newsform devuelve el error
			this.showError(formValidation.errorCode);
		}
	}
}
