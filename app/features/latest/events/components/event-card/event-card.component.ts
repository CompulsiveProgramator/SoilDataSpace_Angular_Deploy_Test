import { Component, Input, ViewChild } from '@angular/core';
import { EventInterface } from '../../interfaces/event-interface';
import { CardColorStyle, CardTypes } from '../../../../../shared/interfaces/card-color-style';
import { EventServiceService } from '../../services/event-service.service';
import { ApiServiceService } from '../../../../../core/services/api-service.service';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-event-card',
  standalone: false,
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  //ATRIBUTOS
  @Input() eventItem!: EventInterface;
  @Input() eventColorStyle!: CardColorStyle; 
  @ViewChild(EventModalComponent) eventModalRef!: EventModalComponent; //Referencia al modal 
  //--- Enum para diferenciar el tipo de tarjeta ---
  @Input() cardType!: CardTypes;
  public readonly cardTypes = CardTypes;
 
  imageList: string[] = [];
  @Input() thumbnailImage!:string; //Imagen de la miniatura de la carta

  //CONSTRUCTOR
  constructor(private eventService: EventServiceService, private apiService:ApiServiceService) { }

  //MÉTODOS
  /**
   * Muestra el modal de noticia, cambiando el valor de isVisible a true mediante la referencia
   */
  showModal() {
    this.eventModalRef.showModal();
  }

  /**
   * Función que recibe la ruta completa de la url de la imagen
   */
  getThumbnailImage() {
    return this.apiService.getFullUrl(this.thumbnailImage);
  }
}
