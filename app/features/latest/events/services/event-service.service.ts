import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { EventInterface } from '../interfaces/event-interface';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../../../../utils/utils.service';

export enum EventErrorMessages {
  REQUIRED_PARAM_NOT_PROVIDED = "ERROR: No se pudo crear el evento. Falta un campo obligatorio.",
  INVALID_CHARACTER = "ERROR: No se pudo crear el evento. Se ha introducido un carácter no admitido (<>&\/).",
  INVALID_FORMAT = "ERROR: No se pudo crear el evento. Una de la imágenes está en un formato no admitido."
}

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  //ATRIBUTOS
  eventList:EventInterface[] = [];

  eventColorStyleList = [
    {
      borderGradientColor:"emerald-500",
      categoryTextColor:"emerald-700",
      categoryAnimationColor:"emerald-500",
      titleTextColor:"emerald-500",
      buttonColor:"emerald-500",
      titleTextColorModal:"emerald-700", 
      categoryTextColorModal:"emerald-600",
      categoryAnimationColorModal:"emerald-500"
    },
    {
      borderGradientColor:"purple-500",
      categoryTextColor:"purple-600",
      categoryAnimationColor:"purple-600",
      titleTextColor:"purple-500",
      buttonColor:"purple-600",
      titleTextColorModal:"purple-600", 
      categoryTextColorModal:"purple-600",
      categoryAnimationColorModal:"purple-600"
    },
    {
      borderGradientColor:"blue-500",
      categoryTextColor:"blue-700",
      categoryAnimationColor:"blue-600",
      titleTextColor:"blue-500",
      buttonColor:"blue-600",
      titleTextColorModal:"blue-700", 
      categoryTextColorModal:"blue-600",
      categoryAnimationColorModal:"blue-600"
    }
  ];

  //CONSTRUCTOR
  constructor(private apiService: ApiServiceService, private util:UtilsService) { }

  //MÉTODOS
  /**
   * Devuelve un observable con la lista de eventos que se pilla del back
   * */
  getAllEvents(): Observable<any>{
    this.eventList=[];
    return this.apiService.httpGet<any>(`/event/public/all`);
  }

  /**
   * Parsea un form a un EventInterface.
   * 
   */
  async parseFormDataToEventInterface(eventForm:FormGroup, files:File[]) : Promise<EventInterface> {
    const formValue = eventForm.value;

    const newEvent: EventInterface = {
      id: formValue.id,
      title: formValue.title,
      date: formValue.date,
      content: formValue.content,
      images: formValue.images,
      files: files
      }
    return newEvent;
  }

  //--- Llamadas API ---
  createEvent(event:EventInterface){
    const formData = new FormData();
    const _event = {
      title: event.title,
      date: event.date,
      content: event.content,
      images: []
    };
    formData.append('event',new Blob([JSON.stringify(_event)], { type: 'application/json' }));
    console.log([JSON.stringify(_event)]);
    //Recorrer la lista de archivos y añadirlos al campo files
    for (let i = 0; i < event.files.length; i++) {
      const file = event.files[i];
      formData.append('files', file);
    }

    this.apiService.httpPost<any>(`/event/marketing/event`,formData).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  deleteEvent(eventId:string){
    this.apiService.httpDelete<any>(`/event/marketing/event/`+eventId).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  editEvent(event:EventInterface){

    /**
     * TOTAL Y ABSOLUTA DEMENCIA:
     * Para que se muestre en la interfaz la lista de imágenes subidas se usa el campo images de EventInterface.
     * Entonces, cuando añadimos una imagen nueva, se añade su nombre al campo images. Qué pasa? que el back lee
     * el nombre de la imagen en el campo images para sobreescribir una imagen. Si meto una imagen nueva en el evento
     * tiene que estar en event.file pero NO en event.images ASÍ QUE tengo que mirar qué imagenes en images están en files
     * para quitarlas de images una vez se mandan. MIL AÑOS DE CÓDIGO ESPAGUETI!!!!!
    */
    for (let i = 0; i < event.files.length; i++){
      const file = event.files[i];
      if (event.images.includes(file.name)){
        const imageNameIndex = event.images.findIndex(img => img === file.name);
        event.images.splice(imageNameIndex,1);
      }
    }

    const formData = new FormData();
    const _event = {
      title: event.title,
      date: event.date,
      content: event.content,
      images: event.images
    };
    formData.append('event',new Blob([JSON.stringify(_event)], { type: 'application/json' }));
    console.log([JSON.stringify(_event)]);
    //El campo files puede estar vacío
    if(event.files){
      for (let i = 0; i < event.files.length; i++) {
        const file = event.files[i];
        formData.append('files', file);
      }
    }
    

    this.apiService.httpPut<any>(`/event/marketing/event/`+event.id,formData).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  /**
   * Hace la validación del formuario, hace validaciones para cada imagen distinta
   */
  formValidation(eventForm: FormGroup,  fileTypes: string[]) : {isValid: boolean, errorCode: EventErrorMessages | null} {
    //--- Validación de campos obligatorios
    if (eventForm.invalid){
      return {isValid:false, errorCode:EventErrorMessages.REQUIRED_PARAM_NOT_PROVIDED}
    }

    //--- Validación de texto ---
    const formValue = eventForm.value; 
    for (const [key, value] of Object.entries(formValue)){
      if (key!='date'&&key!='images'&&key!='files'&&value!=null){
        if (!this.util.textValidation(value as string)){
          return {isValid:false, errorCode:EventErrorMessages.INVALID_CHARACTER}; //Si alguno del texto no cumple, devuelve false
        }
      }
     }
    //--- Validación de imagenes ---
    for (let fileType of fileTypes){
      if (!this.util.imageValidation(fileType)) return {isValid:false, errorCode:EventErrorMessages.INVALID_FORMAT}; //Si no cumple la validación de iamgen, da false
    }
    return {isValid:true, errorCode:null};
  }
}
