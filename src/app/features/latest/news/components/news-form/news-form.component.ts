import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NewsErrorMessages, NewsServiceService } from '../../services/news-service.service';
import { NewsInterface } from '../../interfaces/news-interface';

@Component({
  selector: 'app-news-form',
  standalone: false,
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css'
})

export class NewsFormComponent implements OnInit {
  //ATRIBUTOS
  isVisible!: boolean; //Define si se puede ver el formulario o no
  newsForm!:FormGroup; //Controla el formulario
  errorMessage!: string | null;
  file!: File; //El arachivo que se ha escogido
  fileName: string | null = null; //El nombre del archivo que se ha escogido
  fileType!: string; //El tipo del archivo que se ha escogido
  selectedCategory!: string; //String con la categoría seleccionada
  categoryList!: string[]; //Lista de categorías que se coge del newsService
  newNews!:NewsInterface; //Nueva noticia a crear, AHORA ESTA GUARRO Y ES DE TIPO NEWSINTERFACE PERO LA IDEA ES PASARLO A JSON
  errorActive!:boolean; //True cuando ha ocurrido un error, controla el texto de error

  //CONSTRUCTOR
  //fb es el constructor de formulatio
  constructor(private fb: FormBuilder, private newsService: NewsServiceService) {}

  //METODOS

  //Cuando se inicializa el componente, se crea el controlador del formulario
  ngOnInit(): void {
    this.isVisible = false;
    this.errorActive = false;
    this.newsForm = this.fb.group({
      id: [''], //Aquí el id va vacío porque no hace falta mandar el id de noticia al crear una nueva
      title: ['', Validators.required],
      date: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      link: [''],
      buttonText: [''],
      file: [null]
    });
  }

  //--- Métodos visuales ---

  /**
   * Muestra el modal
   */
  showModal(){
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; 
    this.categoryList = this.newsService.getNewsCategories();
  }

  /**
   * Función que muestra el error cuando no se cumplen las validaciones
   */
  showError(errorCode: NewsErrorMessages | null){
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
    this.newsForm.reset();
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
      this.fileName = null;
      this.fileType = "";
    }
  }

  /**
   * Llamada API que sube el formulario, es asíncrona, espera a que la llamada desde el servicio
   * se complete para cerrar el modal*/
  async onSubmit() : Promise<void> {
    //Si ha elegido la categoría del desplegable se introduce el valor así
    if(this.selectedCategory!='Otro'){
      this.newsForm.patchValue({category: this.selectedCategory});
    }
    const formValidation = this.newsService.formValidation(this.newsForm,this.fileName,this.fileType)
    if (formValidation.isValid){
      this.newsService.createNews( await this.newsService.parseFormDataToNewsInterface(this.newsForm,this.file));
      this.closeModal()
    } else {
      //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
      this.showError(formValidation.errorCode);
    }
  }
}
