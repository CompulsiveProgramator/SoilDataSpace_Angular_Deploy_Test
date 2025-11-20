import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastEvent, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{
	@ViewChild('toast') toast!: ElementRef
	@ViewChild('toastMessage') toastMessage!: ElementRef

	constructor(private renderer: Renderer2, private toastService: ToastService){

	}

	ngOnInit(): void {
		this.toastService.action$.subscribe((event: ToastEvent) => {
			if(event.colorToast == 1){
				this.showGreenToast(event.text)
			}else{
				this.showRedToast(event.text)
			}
		})
	}

	/**
	 * Muestra un toast de bienvenida cuando se inicia sesión correctamente
	 */
	showGreenToast(message: string) {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-emerald-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-cyan-600')

		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', message);

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

	/**
	 * Muestra un toast cuando se cierra la sesión
	 */
	showRedToast(message: string) {
		this.renderer.addClass(this.toast.nativeElement, 'opacity-100')
		this.renderer.removeClass(this.toast.nativeElement, 'opacity-0')
		this.renderer.addClass(this.toast.nativeElement, 'bg-gradient-to-r')
		this.renderer.addClass(this.toast.nativeElement, 'from-red-600')
		this.renderer.addClass(this.toast.nativeElement, 'to-red-800')
		this.renderer.setProperty(this.toastMessage.nativeElement, 'textContent', message);

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
