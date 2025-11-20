import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestPageComponent } from './layouts/latest-page/latest-page.component';
import { LatestRoutingModule } from './latest-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { VideosModule } from './videos/videos.module';
import { NewsModalComponent } from './news/components/news-modal/news-modal.component';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';



@NgModule({
  declarations: [
    LatestPageComponent
  ],
  imports: [
    CommonModule,
    LatestRoutingModule,
    VideosModule,
    NewsModule,
    EventsModule

  ]
})
export class LatestModule { }
