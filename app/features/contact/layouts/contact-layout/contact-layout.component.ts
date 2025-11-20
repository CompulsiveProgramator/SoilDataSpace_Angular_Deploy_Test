import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../services/email.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-contact-layout',
  standalone: false,
  templateUrl: './contact-layout.component.html',
  styleUrl: './contact-layout.component.css'
})
export class ContactLayoutComponent {

	@ViewChild('toast') toast!: ElementRef;
	@ViewChild('toastMessage') toastMessage!: ElementRef


	constructor(private renderer: Renderer2, private emailService: EmailService, private notificationService: NotificationService){}

	sendEmail(form: NgForm) {
		const now = new Date();
		const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

		const data = {
			...form.value,
			time: timeString
		};


		//De verdad con lo bonito que son los formgroups para esto y mi colega aquí no los usa

		//--- Enviar correo cuando no está vacío ---
		if (data!=null&&data.name!=''&&data.email!=''&&data.message!=null&&data.name!=null&&data.email!=null&&data.message!=null){
			this.emailService.sendEmail(data).then((response) => {
			if (response.status === 200) {
				this.showToastGood();
			} else {
				this.showToastBad();
			}
			});
		} else {
			this.showToastIncomplete();
		}
	}

	//El toast tendría que ser un componente en vez de copiar y pegar lo que hizo juanan hace 2 meses

	showToastGood() {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-emerald-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-cyan-600')
		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', `Correo enviado correctamente.`);

		setTimeout(() => {
			this.renderer.addClass(this.toast.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.toast.nativeElement, 'opacity-100')
			setTimeout(() => {
				this.renderer.removeClass(this.toast.nativeElement, 'bg-gradient-to-r')
				this.renderer.removeClass(this.toast.nativeElement, 'from-emerald-600')
				this.renderer.removeClass(this.toast.nativeElement, 'to-cyan-600')
			}, 1500)
		}, 2500);
	}

	showToastBad() {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-red-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-red-800')
		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', `Ha habido un error en el envío del correo.`);

		setTimeout(() => {
			this.renderer.addClass(this.toast.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.toast.nativeElement, 'opacity-100')
			setTimeout(() => {
				this.renderer.removeClass(this.toast.nativeElement, 'bg-gradient-to-r')
				this.renderer.removeClass(this.toast.nativeElement, 'from-red-600')
				this.renderer.removeClass(this.toast.nativeElement, 'to-red-800')
			}, 1500)
		}, 2500);
	}

	showToastIncomplete() {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-red-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-red-800')
		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', `No se puede enviar un correo vacío.`);

		setTimeout(() => {
			this.renderer.addClass(this.toast.nativeElement, 'opacity-0')
			this.renderer.removeClass(this.toast.nativeElement, 'opacity-100')
			setTimeout(() => {
				this.renderer.removeClass(this.toast.nativeElement, 'bg-gradient-to-r')
				this.renderer.removeClass(this.toast.nativeElement, 'from-red-600')
				this.renderer.removeClass(this.toast.nativeElement, 'to-red-800')
			}, 1500)
		}, 2500);
	}

}
