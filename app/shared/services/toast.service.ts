import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastEvent {
	colorToast: number; // 1 green , 2 red
	text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	private actionSubject = new Subject<ToastEvent>();
	action$ = this.actionSubject.asObservable();


	emitAction(actionNumber: number, textMessage: string) {
		this.actionSubject.next({colorToast: actionNumber, text: textMessage});
	}
}
