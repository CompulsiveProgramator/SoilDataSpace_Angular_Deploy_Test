import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestPageComponent } from './layouts/latest-page/latest-page.component';

const routes: Routes = [
  { path: '', component: LatestPageComponent,
    children: [ 
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
      },
      { path: '', redirectTo: 'news', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestRoutingModule { }
