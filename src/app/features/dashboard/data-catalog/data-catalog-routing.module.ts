
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderListPageComponent } from './layouts/provider-list-page/provider-list-page.component';
import { ProviderPageComponent } from './layouts/provider-page/provider-page.component';
const routes: Routes = [
  {
    path: '', 
    component: ProviderListPageComponent //lista de proveedores
  },
  {
    path: 'provider/:provider_id', 
    component: ProviderPageComponent //página de un proveedor en concreto
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCatalogRoutingModule { }