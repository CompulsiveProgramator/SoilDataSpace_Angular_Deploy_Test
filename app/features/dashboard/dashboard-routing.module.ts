import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './layouts/dashboard-page/dashboard-page.component';
const routes: Routes = [
  { path: '', component: DashboardPageComponent,
    children: [ 
      {
        path: 'data-catalog',
        loadChildren: () => import('./data-catalog/data-catalog.module').then(m => m.DataCatalogModule)
      },
      {
        path: 'use-cases',
        loadChildren: () => import('./use-cases/use-cases.module').then(m => m.UseCasesModule)
      },
      { path: '', redirectTo: 'data-catalog', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
