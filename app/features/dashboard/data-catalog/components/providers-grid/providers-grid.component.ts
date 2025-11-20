import { Component, OnInit } from '@angular/core';
import { ProviderInterface } from '../../interfaces/provider-interface';
import { DataCatalogServiceService } from '../../services/data-catalog-service.service';

@Component({
  selector: 'app-providers-grid',
  standalone: false,
  templateUrl: './providers-grid.component.html',
  styleUrl: './providers-grid.component.css',
})
export class ProvidersGridComponent implements OnInit {
  //ATRIBUTOS
  providerList!: ProviderInterface[];

  //CONSTRUCTOR
  constructor (private providerService: DataCatalogServiceService) {}

  //MÉTODOS
  ngOnInit(): void {
    //TODO: llamada al backend para obtener estos datos
    this.providerList = this.providerService.getProviderList();
  }
}
