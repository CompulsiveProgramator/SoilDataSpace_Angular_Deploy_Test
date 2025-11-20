import { Component, Input } from '@angular/core';
import { ProviderInterface } from '../../interfaces/provider-interface';

@Component({
  selector: 'app-provider-card',
  standalone: false,
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.css'
})
export class ProviderCardComponent {
  //ATRIBUTOS
  @Input() providerItem!: ProviderInterface;
  @Input() providerIndex!: number; //TODO: PARA HACER PRUEBAS SE USA EL ID DE LA LISTA EN VEZ DEL ID DEL PROOVEDOR

  //GUARRISIMO DE PRUEBA: QUITAR ESTO
  newsColorStyle = {
        borderGradientColor:"emerald-500",
        categoryTextColor:"emerald-700",
        categoryAnimationColor:"emerald-500",
        titleTextColor:"emerald-500",
        buttonColor:"emerald-500",
        titleTextColorModal:"emerald-700", 
        categoryTextColorModal:"emerald-600",
        categoryAnimationColorModal:"emerald-500"
      };

  //CONSTRUCTOR

  //MÉTODOS
}
