import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongressesComponent } from './layouts/congresses/congresses.component';
import { ArticlesComponent } from './layouts/articles/articles.component';

const routes: Routes = [
  {path: 'congresses', component: CongressesComponent},
  {path: 'articles', component: ArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishingRoutingModule { }
