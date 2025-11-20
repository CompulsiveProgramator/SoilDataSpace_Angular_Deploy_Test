import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { BackgroundPatternComponent } from './components/background-pattern/background-pattern.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ToastComponent } from './components/toast/toast.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationModalComponent,
    LoginComponent,
    BackgroundPatternComponent,
    BackButtonComponent,
    ToastComponent,
    ImageModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],exports: [
    HeaderComponent,
    FooterComponent,
    NotificationModalComponent,
    BackgroundPatternComponent,
    BackButtonComponent,
    ToastComponent,
    ImageModalComponent
  ]
})
export class SharedModule { }
