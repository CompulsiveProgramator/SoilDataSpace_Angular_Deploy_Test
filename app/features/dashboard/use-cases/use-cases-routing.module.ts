import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseCasesPageComponent } from './layouts/use-cases-page/use-cases-page.component';

const routes: Routes = [{ path: '', component: UseCasesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseCasesRoutingModule { }