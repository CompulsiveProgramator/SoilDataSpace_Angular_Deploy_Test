import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: false,
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})

/**
 * Componente que es un modal de una imagen genérica.
 * Se usa para congresos y artículos, como sólo muestra una imagen igual se le puede dar más usos así que se queda en shared
 * */
export class ImageModalComponent {
  @Input() Image!:string; //URL de la imagen
  isVisible:boolean = false;

  showModal(){
    this.isVisible=true;
    document.body.style.overflow = 'hidden'; //IMPORTANTE PARA QUE NO SE HAGA SCROLL DE LO DE ATRÁS
  }
  closeModal(){
    this.isVisible=false;
    document.body.style.overflow = '';
  }

}
