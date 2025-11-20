import { Component,  Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../../interfaces/event-interface';
import { EventErrorMessages, EventServiceService } from '../../services/event-service.service';
import { UtilsService } from '../../../../../utils/utils.service';

@Component({
  selector: 'app-event-edit-form',
  standalone: false,
  templateUrl: './event-edit-form.component.html',
  styleUrl: './event-edit-form.component.css'
})
export class EventEditFormComponent {
    //ATRIBUTOS
  isVisible!: boolean; //Define si se puede ver el formulario o no
  eventForm!:FormGroup;

  //--- Error ---
  errorMessage!: string | null;
  errorActive!:boolean; 

  //--- Archivos escogidos ---
  selectedFiles!: File[]; //lista con los archivos seleccionados
  fileNames!: string[]; //lista de nombres de los archivos
  fileTypes!: string[]; //lista de los formatos de archivos

  @Input() eventItem!:EventInterface; //Evento del que partimos
  editEvent!:EventInterface; //Evento que sobreescribe al anterior

  //CONSTRUCTOR
  //fb es el constructor de formulatio
  constructor(private fb: FormBuilder, private eventService: EventServiceService, private util:UtilsService) {}

  //METODOS

  //Cuando se inicializa el componente, se crea el controlador del formulario
  ngOnInit(): void {
    this.isVisible = false;
    this.errorActive = false;
    console.log(this.eventItem);
  }

   //-- Métodos privados
  /**
   * Resetea el formulario, poniendo los datos del evento que se quiere editar
   */
  private resetForm(){
    this.selectedFiles = [];
    this.fileTypes = [];
    this.fileNames = [...this.eventItem.images];
    this.eventForm = this.fb.group({
      id: [this.eventItem.id],
      title: [this.eventItem.title, Validators.required],
      date: [this.eventItem.date,Validators.required],
      content: [this.eventItem.content],
      images: [this.eventItem.images],
      files: [[]]
    });
  }

  //--- Métodos visuales ---

  /**
   * Muestra el modal
   */
  showModal(){
    this.isVisible = true;
    document.body.style.overflow = 'hidden';
    this.resetForm(); 
    console.log(this.fileNames);
    console.log(this.selectedFiles);
    console.log(this.fileTypes);
  }

  /**
   * Función que muestra el error cuando no se cumplen las validaciones
   */
  showError(errorCode: EventErrorMessages | null){
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
    this.resetForm();
    window.location.reload(); 
  }

  //--- Métodos del formulario

  /*
   * Se lanza cuando se añade un nuevo archivo, sirve para cambiar el texto
   * del botón de subir archivo y quede pero que bien bonito
   * */
  onFileSelected(event: any): void {
    const newFiles = Array.from(event.target.files) as File[];
    for (const file of newFiles) {
      // 1. Añade el objeto File real (para subir)
      this.selectedFiles.push(file); 
      // 2. Añade el nombre del archivo (para la UI combinada)
      this.fileNames.push(file.name); 
      // 3. Añade el tipo de archivo (para validación)
      this.fileTypes.push(file.type); 
    }
    event.target.value = null;
  }

  /**
   * Llamada API que sube el formulario, es asíncrona, espera a que la llamada desde el servicio
   * se complete para cerrar el modal
   * */
  async onSubmit() : Promise<void> {
    const formValidation = this.eventService.formValidation(this.eventForm,this.fileTypes)
    if (formValidation.isValid && (this.selectedFiles||this.fileNames) && this.fileNames.length>0){
      this.eventService.editEvent( await this.eventService.parseFormDataToEventInterface(this.eventForm,this.selectedFiles));
      this.closeModal()
    } else {
      if(!formValidation.isValid){
        //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
        this.showError(formValidation.errorCode);
      }
      this.showError(EventErrorMessages.REQUIRED_PARAM_NOT_PROVIDED);
    }
  }
}
