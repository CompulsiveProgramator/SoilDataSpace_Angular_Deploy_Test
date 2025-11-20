import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { NewsServiceService } from '../../services/news-service.service';
import { NewsInterface } from '../../interfaces/news-interface';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-news-carrousel',
    templateUrl: './news-carrousel.component.html',
    styleUrl: './news-carrousel.component.css',
    standalone: false
})
export class NewsCarrouselComponent implements OnInit {
  //ATRIBUTOS
  newsList!: NewsInterface[]; //Lista de noticias, son de tipo newsInterface
  @ViewChild('newsScroller') newsScrollerRef!: ElementRef<HTMLDivElement>; //Obtiene la referencia al objeto con id newsScroller en el dom, funciona como getbyid
  //Variables para que se ocule el botón si está en la esquina
  showLeftButton!:boolean;
  showRightButton!:boolean;

  //CONSTRUCTOR
  constructor(private newsService: NewsServiceService) {
  }

  //MÉTODOS
  ngOnInit(): void {
    //TODO: llamada al backend para que obtenga el newsList
    this.newsList = this.newsService.getAllNews();
    this.showLeftButton=false;
    this.showRightButton=true;
  }

  /**
   * Obtiene el desplazamiento del scroller, funciona como en la antigua app
   * es privada
   */
  private getStep(): number {
    const scroller = this.newsScrollerRef.nativeElement;
    return Math.max(100, scroller.clientWidth * 0.5);
  }

  /**
   * Función que oculta los botones de izquierda y derecha cuando es necesario.
   */
  checkScroll() {
    const scroller = this.newsScrollerRef.nativeElement;
    const tolerance = 4;
    this.showLeftButton = scroller.scrollLeft > tolerance;
    this.showRightButton = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - tolerance;
  }


  /**
   * Desplaza el scroller a izquierda(-1) y derecha(1) utilizando un numero como
   * dirección en el eje x
   */
  scrollNews(direction: number): void {
    const scroller = this.newsScrollerRef.nativeElement;
    scroller.scrollBy({ 
      left: direction * this.getStep(), 
      behavior: 'smooth' 
    });
  }
  
  /**
   * Hace el desplazamiento del scroller usando la rueda del ratón
   */
  
  onWheelScroll(event: WheelEvent): void {
    const scroller = this.newsScrollerRef.nativeElement;
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }

  /**
   * Obtiene el estilo de color de la noticia según su indice,
   * se lo pasa como atributo Input en el HTML
   */
  getCardColor(index: number): CardColorStyle {
    return this.newsService.newsColorStyleList[index % this.newsService.newsColorStyleList.length];
  }

  /**
   * Recarga el carrousel de noticias, se utiliza cuando se crea una noticia nueva o se borra
   * Ejecuta de nuevo el getAllNews.
   */
  reloadCarrousel() {
    this.newsList = this.newsService.getAllNews();
  }

}
