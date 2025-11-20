import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactLayoutComponent } from './layouts/contact-layout/contact-layout.component';

const routes: Routes = [
    { path: '', component: ContactLayoutComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {}