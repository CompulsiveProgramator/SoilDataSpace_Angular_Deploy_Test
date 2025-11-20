import { Component, Input, ViewChild } from '@angular/core';
import { NewsModalComponent } from '../news-modal/news-modal.component';
import { NewsInterface } from '../../interfaces/news-interface';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { SafeUrl } from '@angular/platform-browser';
import { NewsServiceService } from '../../services/news-service.service';
import { ApiServiceService } from '../../../../../core/services/api-service.service';
import { CardTypes } from '../../../../../shared/interfaces/card-color-style';

@Component({
  selector: 'app-news-grid-card',
  standalone: false,
  templateUrl: './news-grid-card.component.html',
  styleUrl: './news-grid-card.component.css'
})
export class NewsGridCardComponent {
  //ATRIBUTOS

  //--- Atributos que vienen del componente padre ---
  @Input() newsItem!: NewsInterface;
  @Input() newsIndex!: number; //El índice de la noticia en la lista de noticias, no es el id de noticia de la base de datos
  @Input() newsColorStyle!: CardColorStyle; //Color de la carta
  @ViewChild(NewsModalComponent) newsModalRef!: NewsModalComponent; //Referencia al modal de noticia
  //--- Enum para diferenciar el tipo de tarjeta ---
  @Input() cardType!: CardTypes;
  public readonly cardTypes = CardTypes;
 
  finalImage: string = '';
  finalButtonText: string = '';
  showButton: boolean = false;
  isDeleteNewsVisible!: boolean;

  safeImage?: SafeUrl;

  //CONSTRUCTOR
  constructor(private newsService: NewsServiceService, private apiService: ApiServiceService) { }

  //MÉTODOS
  /**
   * Inicializar carta
   * */
  ngOnInit() {
    // Lógica para determinar la imagen por defecto
    if (this.newsItem.image){
      this.finalImage = this.apiService.getFullUrl(this.newsItem.image.toString());
    } else {
      this.finalImage = this.newsService.defaultNewsImage;
    } 

    // Lógica para determinar el texto del botón por defecto
    if (this.newsItem.buttonText && this.newsItem.buttonText !== '') {
      this.finalButtonText = this.newsItem.buttonText;
    } else {
      this.finalButtonText = 'Visitar';
    }

    // Lógica para mostrar el botón
    this.showButton = !!this.newsItem.link;
    
  }

  /**
   * Muestra el modal de noticia, cambiando el valor de isVisible a true mediante la referencia
   */
  showModal() {
    this.newsModalRef.showModal();
  }

}
