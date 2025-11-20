import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLayoutComponent } from './layouts/contact-layout/contact-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { ContactRoutingModule } from './contact-routing.module';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ContactLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    FormsModule
]
})
export class ContactModule { }
