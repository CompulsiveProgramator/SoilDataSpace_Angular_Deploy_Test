import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Tipo enumerado con los distintos tamaños de pantalla posibles.
 */
export enum ScreenSizes {
  LAPTOP,
  TABLET,
  LANDSCAPE,
  PORTRAIT
}


@Injectable({
  providedIn: 'root'
})
export class ScreenSizeServiceService {
  //ATRIBUTOS
  //--- Mapa donde cada tamaño tiene asignada el query que se manda a matchMedia para decidir si lo cumple o no ---
  private sceenSizeQueries = new Map<ScreenSizes, string>([
  [ScreenSizes.LAPTOP, '(min-width: 1024px)'],
  [ScreenSizes.TABLET, '(min-width: 768px) and (max-width: 1024px)'],
  [ScreenSizes.LANDSCAPE, '(max-width: 767px) and (orientation: landscape)'],
  [ScreenSizes.PORTRAIT, '(max-width: 767px) and (orientation: portrait)'],]);

  //--- Valor que se emite a los subscriptores con el tamaño de la pantalla actual ---
  private currentScreenSizeSubject = new BehaviorSubject<ScreenSizes>(ScreenSizes.LAPTOP);
  
  //--- Observable público al que se subscriben los componentes que necesitan saber el tamaño de la pantalla ---
  public currentScreenSize$: Observable<ScreenSizes> = this.currentScreenSizeSubject.asObservable();

  //CONSTRUCTOR
  constructor() {
    this.setupMediaQueries();
  }

  //MÉTODOS

  /**
   * Para cada query se crea un mediaquerylist y se añade un controlador para que cambie el valor
   * del tamaño actual en consecuencia.
   **/
  private setupMediaQueries(): void {
    //--- Para cada query ---
    this.sceenSizeQueries.forEach((query: string, size: ScreenSizes) => {
      //--- Crear mql ---
      const mql: MediaQueryList = window.matchMedia(query);
      //--- Crear controlador que llama a la función que cambia el valor ---
      const handler = (event: MediaQueryListEvent) => {
        this.onMediaQueryChange(event, size);
      };
      //--- Asignar controlador  ---
      mql.addEventListener('change', handler);
      //--- Hace una comprobación para ver si tiene el valor inicial ---
      if (mql.matches) {
        this.currentScreenSizeSubject.next(size);
      }
    });
  }

  /**
   * Función que se ejecuta cuando hay un cambbio de las dimensiones de la pantalla
   * Devuelve el tamaño de la query que ya ha ocurrido.
   **/
  private onMediaQueryChange(event: MediaQueryListEvent, size: ScreenSizes): void {
    if (event.matches) {
      this.currentScreenSizeSubject.next(size);
    }
  }
}
