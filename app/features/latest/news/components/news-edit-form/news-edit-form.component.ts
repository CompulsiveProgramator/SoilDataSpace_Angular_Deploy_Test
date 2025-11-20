import { Component, Input, OnInit } from '@angular/core';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsErrorMessages, NewsServiceService } from '../../services/news-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UtilsService } from '../../../../../utils/utils.service';

@Component({
  selector: 'app-news-edit-form',
  standalone: false,
  templateUrl: './news-edit-form.component.html',
  styleUrl: './news-edit-form.component.css'
})
export class NewsEditFormComponent implements OnInit {
  //ATRIBUTOS
  //--- Atributos de entrada ---
  @Input() newsItem!: NewsInterface;
  @Input() newsIndex!: number;
  isVisible!: boolean;
  newsForm!:FormGroup; //Objeto de formulario
  editedNews!:NewsInterface;  //Noticia editada
  errorMessage!:string | null;
  errorActive!:boolean
  selectedCategory!: string; //String con la categoría seleccionada
  categoryList!: string[]; //Lista de categorías que se coge del newsService
  //--- Atributos de la imagen ---
  file!: File | null; 
  fileName: string | null = null; 
  fileType!: string; 

  //CONSTRUCTOR
  constructor(private fb: FormBuilder, private newsService:NewsServiceService, private util:UtilsService) {}

  //MÉTODOS
  ngOnInit(): void {
    this.isVisible = false;
    this.errorActive = false;
    this.fileName = "";
    this.fileType = "";
    this.resetForm();
  }

  //-- Métodos privados
  /**
   * Resetea el formulario, poniendo los datos de la noticia que se quiere editar
   */
  private resetForm(){
    this.newsForm = this.fb.group({ //Por defecto toman los valores del newsItem del modal de donde cuelga 
      id: [this.newsItem.id, Validators.required],
      title: [this.newsItem.title, Validators.required],
      date: [this.newsItem.date, Validators.required],
      author: [this.newsItem.author, Validators.required],
      category: [this.newsItem.category, Validators.required],
      description: [this.newsItem.description, Validators.required],
      content: [this.newsItem.content, Validators.required],
      link: [this.newsItem.link],
      buttonText: [this.newsItem.buttonText],
      image: [this.newsItem.image],
      file:null
    });
    this.fileName=this.util.extractBaseFileName(this.newsItem.image as string);
  }

  //--- Métodos visuales ---

  /**
   * Muestra el modal
   */
  showModal(){
    this.isVisible = true;
    document.body.style.overflow = 'hidden';
    this.selectedCategory=this.newsItem.category;
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
    this.resetForm();
    window.location.reload(); //Recargar la página cuando cierra para evitar que quite una imagen, cierre y vuelva a abrir y que no salga imagen
  }

  //--- Métodos del formulario

  /**
   * Quita la imagen de la noticia
   */
  onDeleteImage(){
    this.file = null;
    this.fileName = null;
    this.fileType="";
    this.newsForm.patchValue({ 
      image: null, 
      file: null
    });
    
  }

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
    console.log(this.newsForm);
    //Si ha elegido la categoría del desplegable se introduce el valor así
    if(this.selectedCategory!='Otro'){
      this.newsForm.patchValue({category: this.selectedCategory});
    }
    console.log(this.newsForm);
    const formValidation = this.newsService.formValidation(this.newsForm,this.fileName,this.fileType)
    if (formValidation.isValid){
      this.newsService.editNews( await this.newsService.parseFormDataToNewsInterface(this.newsForm,this.file),this.newsIndex);
      //this.closeModal()
    } else {
      //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
      this.showError(formValidation.errorCode);
    }
  }

}
