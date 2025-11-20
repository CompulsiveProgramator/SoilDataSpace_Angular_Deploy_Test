import { Injectable } from '@angular/core';
import { ProviderInterface } from '../interfaces/provider-interface';

@Injectable({
  providedIn: 'root'
})
export class DataCatalogServiceService {
  //ATRIBUTOS

  //--- Lista de proveedores de prueba ---
  testProviderList: ProviderInterface[] = [
    { name: 'Universidad de Jaén',
      description: 'Base de datos local de la universidad',
      categories: ['Datos de Suelo', 'Geolit', 'Datos de Olivos'],
      logo: 'assets/logos/uja.png'
    },
    { name: 'IFAPA',
      description: 'Base de datos del IFAPA',
      categories: ['Temperatura','Datos de Suelo','Agro','Hidro'],
      logo: 'assets/logos/ifapa.jpg'
    }
  ];

  //CONSTRUCTOR
  constructor() { }

  //MÉTODOS

  /**
   * Llamada a la api para recibir la lista de proovedores a los que tenemos acceso.
   * TODO: AHORA DEVUELVE DATOS DE PRUEBA.
   */
  getProviderList(): ProviderInterface[] {
    return this.testProviderList;
  }
}