import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';
import { ProvidersGridComponent } from './components/providers-grid/providers-grid.component';
import { ProviderTableItemComponent } from './components/provider-table-item/provider-table-item.component';
import { ProviderPageComponent } from './layouts/provider-page/provider-page.component';
import { ProviderListPageComponent } from './layouts/provider-list-page/provider-list-page.component';
import { DataCatalogRoutingModule } from './data-catalog-routing.module';
import { SharedModule } from '../../../shared/shared.module';
//--- Importaciones de Material ---
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    ProviderCardComponent,
    ProvidersGridComponent,
    ProviderTableItemComponent,
    ProviderPageComponent,
    ProviderListPageComponent
  ],
  imports: [
    CommonModule,
    DataCatalogRoutingModule,
    SharedModule,
    //-- Modulos de Mat ---
    MatGridListModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatIconModule
  ]
})
export class DataCatalogModule { }
