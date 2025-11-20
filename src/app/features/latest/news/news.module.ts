import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchMediaDirective } from '../../../utils/match-media.directive';
import { NewsPageComponent } from './layouts/news-page/news-page.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsCarrouselComponent } from './components/news-carrousel/news-carrousel.component';
import { NewsEditFormComponent } from './components/news-edit-form/news-edit-form.component';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsModalComponent } from './components/news-modal/news-modal.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsGridComponent } from './components/news-grid/news-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { NewsGridCardComponent } from './components/news-grid-card/news-grid-card.component';
//--- Material ---
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    NewsCardComponent,
    NewsCarrouselComponent,
    NewsEditFormComponent,
    NewsFormComponent,
    NewsModalComponent,
    NewsPageComponent,
    NewsGridComponent,
    NewsGridCardComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule,
    ReactiveFormsModule,
    MatchMediaDirective,
    MatSelectModule,
    MatFormFieldModule, 
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    NewsCarrouselComponent,
    NewsFormComponent,  
  ], //IMPORTANTE PARA QUE SE PUEDA USAR FUERA DEL MODULO PONERLO EN LOS EXPORTS
})
export class NewsModule { }