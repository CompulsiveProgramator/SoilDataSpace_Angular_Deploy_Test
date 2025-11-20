import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishingRoutingModule } from './publishing-routing.module';
import { CongressesComponent } from './layouts/congresses/congresses.component';
import { ArticlesComponent } from './layouts/articles/articles.component';
import { SharedModule } from '../../shared/shared.module';
import { ArticlesEditFormComponent } from './components/articles-edit-form/articles-edit-form.component';
import { ArticlesFormComponent } from './components/articles-form/articles-form.component';
import { ArticlesGridComponent } from './components/articles-grid/articles-grid.component';
import { ArticlesGridCardComponent } from './components/articles-grid-card/articles-grid-card.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatchMediaDirective } from '../../utils/match-media.directive';
import { CongressEditFormComponent } from './components/congress-edit-form/congress-edit-form.component';
import { CongressFormComponent } from './components/congress-form/congress-form.component';
import { CongressGridComponent } from './components/congress-grid/congress-grid.component';
import { CongressGridCardComponent } from './components/congress-grid-card/congress-grid-card.component';

@NgModule({
  declarations: [
    CongressesComponent,
    ArticlesComponent,
    ArticlesEditFormComponent,
    ArticlesFormComponent,
    ArticlesGridComponent,
    ArticlesGridCardComponent,
    CongressEditFormComponent,
    CongressFormComponent,
    CongressGridComponent,
    CongressGridCardComponent
  ],
  imports: [
    CommonModule,
    PublishingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatchMediaDirective,
    MatSelectModule,
    MatFormFieldModule, 
    MatGridListModule,
    MatCardModule,
    FormsModule
  ]
})
export class PublishingModule { }
