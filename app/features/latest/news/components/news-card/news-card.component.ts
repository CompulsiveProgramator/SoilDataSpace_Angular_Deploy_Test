import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsServiceService } from '../../services/news-service.service'; 
import { NewsModalComponent } from '../news-modal/news-modal.component';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ApiServiceService } from '../../../../../core/services/api-service.service';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrl: './news-card.component.css',
    standalone: false
})

export class NewsCardComponent implements OnInit {
  //ATRIBUTOS

  //--- Atributos que vienen del componente padre ---
  @Input() newsItem!: NewsInterface;
  @Input() newsIndex!: number; //El índice de la noticia en la lista de noticias, no es el id de noticia de la base de datos
  @Input() newsColorStyle!: CardColorStyle; //Color de la carta
  @ViewChild(NewsModalComponent) newsModalRef!: NewsModalComponent; //Referencia al modal de noticia

  finalImage: string = '';
  finalButtonText: string = '';
  showButton: boolean = false;
  isDeleteNewsVisible!: boolean;

  safeImage?: SafeUrl;
  
  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 
  
  //CONSTRUCTOR
  constructor(private newsService: NewsServiceService, private apiService: ApiServiceService, private screenSizeService:ScreenSizeServiceService) { }

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
    
    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
    .subscribe((size: ScreenSizes) => {
      this.screenSize = size;
    });
  }

  //MÉTODOS

  /**
   * Muestra el modal de noticia, cambiando el valor de isVisible a true mediante la referencia
   */
  showModal() {
    this.newsModalRef.showModal();
  }

}
