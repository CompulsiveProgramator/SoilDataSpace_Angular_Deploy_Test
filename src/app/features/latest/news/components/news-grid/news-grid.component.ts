import { Component, OnInit } from '@angular/core';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsServiceService } from '../../services/news-service.service';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { CardTypes } from '../../../../../shared/interfaces/card-color-style';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';

@Component({
  selector: 'app-news-grid',
  standalone: false,
  templateUrl: './news-grid.component.html',
  styleUrl: './news-grid.component.css'
})
export class NewsGridComponent implements OnInit {
  //ATRIBUTOS
  newsList!: NewsInterface[]; //Lista completa
  latestNews!: NewsInterface[]; //Lista con las 3 primeras noticias
  moreNews!: NewsInterface[]; //Lista con el resto de noticias
  public readonly cardTypes = CardTypes; //exponer para que se pueda usar en el html
  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 

  //CONSTRUCTOR
  constructor(private newsService: NewsServiceService,private screenSizeService:ScreenSizeServiceService) {
  }

  //MÉTODOS
  ngOnInit(): void {
    this.newsList=[];
    this.latestNews=[];
    this.moreNews=[];

    //--- Se hace aquí para que mediante asíncronía se carge la lista total y las listas parciales ---
    this.newsService.getAllNewsForNewsPage().subscribe(data => {
      console.log(data);
      //--- Llenar lista total de noticias ---
      for (let news of data.news) {
        let newNews : NewsInterface = news;
        this.newsService.newsList.unshift(newNews);
      }
      this.newsList = this.newsService.newsList;
      
      //--- Llenar las listas más pequeñas ---
      for (const [index, n] of this.newsService.newsList.entries()){
        if (index<3) {
          this.latestNews.push(n);
        } else {
          this.moreNews.push(n);
        }
      }
      console.log(this.latestNews);
    });

    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
    .subscribe((size: ScreenSizes) => {
      this.screenSize = size;
    });
  
  }

  getCardColor(index: number): CardColorStyle {
      return this.newsService.newsColorStyleList[index % this.newsService.newsColorStyleList.length];
  }

  /**
   * Devuelve el índice de la lista global de noticias en base a la noticia.
   * Ya estamos full en código espagueti no hay forma de salir de esta.
   */
  getIndex(news:NewsInterface): any{
    return this.newsService.newsList.findIndex(_news => news.id === _news.id);
  }
}
