import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { LatestModule } from '../latest/latest.module';
import { PartnersCarrouselComponent } from './components/partners-carrousel/partners-carrousel.component';
import { PartnersCardComponent } from './components/partners-card/partners-card.component';
import { NewsModule } from '../latest/news/news.module';

@NgModule({
  declarations: [
    HomeComponent,
    PartnersCarrouselComponent,
    PartnersCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NewsModule,
  ],
  exports: [
    PartnersCarrouselComponent,
    PartnersCardComponent
  ]
})
export class HomeModule { }
