import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectiveComponent } from './layouts/objective/objective.component';
import { TeamComponent } from './layouts/team/team.component';
import { PartnersComponent } from './layouts/partners/partners.component';
import { FundingComponent } from './layouts/funding/funding.component';

const routes: Routes = 
[
    { 
        path: 'objective', component: ObjectiveComponent
    },
    {
        path: 'team', component: TeamComponent,
    },
    {
        path: 'partners', component: PartnersComponent,
    },
    {
        path: 'funding', component: FundingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }