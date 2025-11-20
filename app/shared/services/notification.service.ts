import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
  type: 'message' | 'error';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationData>();

  notification$ = this.notificationSubject.asObservable();

  showMessage(message: string) {
    this.notificationSubject.next({
      type: 'message',
      title: 'Notificación',
      message
    });
  }

  showError(code: string, message?: string) {
    this.notificationSubject.next({
      type: 'error',
      title: 'Error: '+code,
      message: message || this.getErrorMessage(code)
    });
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case '401': return 'Sesión expirada. Por favor, inicia sesión.';
      case '403': return 'No autorizado. Por favor, inicia sesión.';
      case '404': return 'Recurso no encontrado.';
      case '500': return 'Error interno del servidor.';
      default: return 'Ha ocurrido un error inesperado.';
    }
  }
}
