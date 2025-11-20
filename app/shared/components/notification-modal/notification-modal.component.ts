import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, NotificationData } from '../../services/notification.service';

@Component({
  selector: 'app-notification-modal',
  standalone: false,
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit, OnDestroy {
  visible = false;
  title = '';
  message = '';
  type: 'message' | 'error' = 'message';

  private sub!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.sub = this.notificationService.notification$.subscribe((data: NotificationData) => {
      this.title = data.title;
      this.message = data.message;
      this.type = data.type;
      this.visible = true;
      document.body.style.overflow = 'hidden';
    });
  }

  close() {
    this.visible = false;
    document.body.style.overflow = '';
    if (this.type=='error'){
      window.location.reload();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
