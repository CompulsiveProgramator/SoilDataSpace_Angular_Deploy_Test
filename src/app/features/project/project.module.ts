import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectiveComponent } from './layouts/objective/objective.component';
import { TeamComponent } from './layouts/team/team.component';
import { PartnersComponent } from './layouts/partners/partners.component';
import { FundingComponent } from './layouts/funding/funding.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { TeamGridComponent } from './components/team-grid/team-grid.component';


@NgModule({
  declarations: [
    ObjectiveComponent,
    TeamComponent,
    PartnersComponent,
    FundingComponent,
    TeamGridComponent
  ],
  imports: [
    ProjectRoutingModule,
    CommonModule,
    SharedModule,
    HomeModule,
    MatGridListModule
  ]
})
export class ProjectModule { }
