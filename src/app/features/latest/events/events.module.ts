import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './layouts/events-page/events-page.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventGridComponent } from './components/event-grid/event-grid.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NewsModule } from '../news/news.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchMediaDirective } from '../../../utils/match-media.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { EventFormComponent } from './components/event-form/event-form.component';
import { ImageCarrouselComponent } from './components/image-carrousel/image-carrousel.component';
import { EventEditFormComponent } from './components/event-edit-form/event-edit-form.component';
import { EventEditImageItemComponent } from './components/event-edit-image-item/event-edit-image-item.component';



@NgModule({
  declarations: [
    EventsPageComponent,
    EventCardComponent,
    EventGridComponent,
    EventModalComponent,
    EventFormComponent,
    ImageCarrouselComponent,
    EventEditFormComponent,
    EventEditImageItemComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatchMediaDirective,
    MatSelectModule,
    MatFormFieldModule, 
    MatGridListModule,
    MatCardModule
  ]
})
export class EventsModule { }
