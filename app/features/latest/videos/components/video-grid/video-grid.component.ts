import { Component, Input, OnInit } from '@angular/core';
import { VideoInterface } from '../../interfaces/video-interface';

@Component({
  selector: 'app-video-grid',
  standalone: false,
  templateUrl: './video-grid.component.html',
  styleUrl: './video-grid.component.css'
})
export class VideoGridComponent {
  //ATRIBUTOS
  @Input() videoList!:VideoInterface[];
  latestVideos:VideoInterface[] = []; //Primeros x videos de la lista. donde x es cols para que se vea una fila solo. ¿como que xvideos? illow
  moreVideos:VideoInterface[] = []; //Siguientes videos de la lista, ocultos detrás de un botón de ver más
  moreVideosVisible!:boolean;
  //Configuración del grid
  @Input() cols!: number; 
  @Input() rowHeight!: string;

  //--- Web Responsive ---
  @Input() isMobile!:boolean;

  //MÉTODOS

  /**
   * Función que inicializa la lista de videos, en vez de usar el oninit, se llama desde el componente de página cuando 
   * las listas de vídeos que se van a pasar están llenas.
   */
  initializeVideos() {
    this.latestVideos = [];
    this.moreVideos = [];
    for (let index = 0; index < this.videoList.length; index++) {
      const element = this.videoList[index];
      if(index < this.cols){
        this.latestVideos.push(element);
      }else{
        this.moreVideos.push(element);
      }
    }
    this.moreVideosVisible=false;
  }

  /**
   * Cambiar visibilidad de más videos de que se vean más o menos
   */
  toggleMoreVideos(){
    this.moreVideosVisible=!this.moreVideosVisible;
  }
}
