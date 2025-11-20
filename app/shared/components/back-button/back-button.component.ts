import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: false,
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
/**
 * Componente que contiene un botón para volver a la página anterior. Útil para la navegación.
 */
export class BackButtonComponent {
  constructor (private location: Location) {}

  /**
   * Utiliza location para volver a la última página navegada. Se llama cuando se hace click
   * en el botón.
   */
  goBack(){
    this.location.back();
  }
}
