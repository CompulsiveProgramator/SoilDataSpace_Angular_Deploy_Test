import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseCasesRoutingModule } from './use-cases-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { UseCasesPageComponent } from './layouts/use-cases-page/use-cases-page.component';

@NgModule({
  declarations: [
    UseCasesPageComponent
  ],
  imports: [
    CommonModule,
    UseCasesRoutingModule,
    SharedModule
  ]
})
export class UseCasesModule { }
