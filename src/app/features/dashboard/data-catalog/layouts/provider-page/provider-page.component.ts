import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProviderInterface } from '../../interfaces/provider-interface';
import { ProviderTableInterface } from '../../interfaces/provider-table-interface';
import { DataCatalogServiceService } from '../../services/data-catalog-service.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-provider-page',
  standalone: false,
  templateUrl: './provider-page.component.html',
  styleUrl: './provider-page.component.css'
})
export class ProviderPageComponent implements OnInit {
  //ATRIBUTOS
  providerItem!: ProviderInterface; //Proveedor de donde se sacan estas tablas
  providerTableList!: ProviderTableInterface[]; //Lista con las tablas de este proovedor

  //--- Información de prueba ---
  providerTableListTest = [
    {name: 'aove2025',
    description: 'Listado de los datos del AOVE recogido durante el año 2025 utilizando a José Antonio.',
    columns: ['Cantidad de aceite','Fecha de recogida','Calidad del aove'],
    available: true,
    lisence: 'Licencia Gratuita v.03',
    link: 'https://play.google.com/pc-store/games/details?id=com.supercell.clashroyale&hl=es',
    },
    {
    name: 'suelos_sierra2023',
    description: 'Análisis de datos de composición del suelo de la Finca La Sierra, recogidos en otoño de 2023.',
    columns: ['PH del suelo', 'Nivel de nitrógeno', 'Profundidad de muestreo', 'Textura predominante'],
    available: false,
    lisence: 'Licencia Acceso Público v.1.0',
    link: 'https://datos-falsos.es/suelos_sierra2023' 
},
{
    name: 'clima_andalucia2024',
    description: 'Registros diarios de variables climáticas en la zona de Jaén durante la primera mitad de 2024.',
    columns: ['Temperatura máxima', 'Precipitación acumulada', 'Humedad relativa media', 'Velocidad del viento'],
    available: false, 
    lisence: 'Licencia Gratuita v.04',
    link: 'https://datos-falsos.es/clima_andalucia2024' 
},
{
    name: 'riego_parcelaB',
    description: 'Histórico de los datos de riego por goteo en la Parcela B, simulado para una optimización futura.',
    columns: ['Caudal (L/h)', 'Duración del riego (min)', 'Horario de aplicación', 'Índice de evapotranspiración'],
    available: true,
    lisence: 'Licencia Experimental Beta',
    link: 'https://datos-falsos.es/riego_parcelaB_sim' 
}
  ]
  //CONSTRUCTOR
  constructor (private providerService : DataCatalogServiceService, private route : ActivatedRoute) {}

  //MÉTODOS
  ngOnInit(): void {
    //this.route.snapshot.paramMap.get() es para obtener parámetros de la ruta
    const providerListIndex = parseInt(this.route.snapshot.paramMap.get('provider_id')as string);
    this.providerItem= this.providerService.getProviderList()[providerListIndex];
    this.providerTableList=this.providerTableListTest;
  } 
}