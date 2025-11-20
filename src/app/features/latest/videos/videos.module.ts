import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosPageComponent } from './layouts/videos-page/videos-page.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { VideoGridComponent } from './components/video-grid/video-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import {YouTubePlayer} from '@angular/youtube-player';
import { MatGridListModule } from '@angular/material/grid-list';
import { VideoFormComponent } from './components/video-form/video-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoEditFormComponent } from './components/video-edit-form/video-edit-form.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    VideosPageComponent,
    VideoCardComponent,
    VideoGridComponent,
    VideoFormComponent,
    VideoEditFormComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    SharedModule,
    YouTubePlayer, //Para los videos embebidos
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class VideosModule { }
