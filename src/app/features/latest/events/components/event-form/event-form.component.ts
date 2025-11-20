import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../../interfaces/event-interface';
import { EventErrorMessages, EventServiceService } from '../../services/event-service.service';

@Component({
  selector: 'app-event-form',
  standalone: false,
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
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

  newEvent!:EventInterface;

  //CONSTRUCTOR
  //fb es el constructor de formulatio
  constructor(private fb: FormBuilder, private eventService: EventServiceService) {}

  //METODOS

  //Cuando se inicializa el componente, se crea el controlador del formulario
  ngOnInit(): void {
    this.isVisible = false;
    this.errorActive = false;
    this.eventForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      date: ['',Validators.required],
      content: [''],
      images: [[]],
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
    this.eventForm.reset();
  }

  //--- Métodos del formulario

  /*
   * Se lanza cuando se añade un nuevo archivo, sirve para cambiar el texto
   * del botón de subir archivo y quede pero que bien bonito
   * */
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileNames = [];
    this.fileTypes = [];
    for (let index = 0; index < this.selectedFiles.length; index++) {
      const file = this.selectedFiles[index];
      this.fileNames.push(file?.name as string);
      this.fileTypes.push(file?.type as string);
    }
  }

  /**
   * Llamada API que sube el formulario, es asíncrona, espera a que la llamada desde el servicio
   * se complete para cerrar el modal
   * */
  async onSubmit() : Promise<void> {
    const formValidation = this.eventService.formValidation(this.eventForm,this.fileTypes)
    if (formValidation.isValid  && this.selectedFiles && this.selectedFiles.length > 0){
      this.eventService.createEvent( await this.eventService.parseFormDataToEventInterface(this.eventForm,this.selectedFiles));
      this.closeModal()
    } else {
      //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
      this.showError(formValidation.errorCode);
    }
  }
}
