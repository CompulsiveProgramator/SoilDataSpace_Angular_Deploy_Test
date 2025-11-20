import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactLayoutComponent } from './features/contact/layouts/contact-layout/contact-layout.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'project', loadChildren: () => import('./features/project/project.module').then(m => m.ProjectModule)},
  { path: 'latest',  loadChildren: () => import('./features/latest/latest.module').then(m => m.LatestModule)},
  { path: 'publishing', loadChildren: () => import('./features/publishing/publishing.module').then(m => m.PublishingModule)},
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)},
  //{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
