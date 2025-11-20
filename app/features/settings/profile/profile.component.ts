import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../core/services/api-service.service';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
	username: string = ""
	userDataVisible = true
	updateUserDataVisible = false
	privacyAndSecurityVisible = false

	constructor(private apiService: ApiServiceService){}

	ngOnInit(): void {
		this.username = localStorage.getItem('username') ?? ""
	}

	/**
	 * Función que activa la visualización del apartado seleccionado, en la barra de opciones
	 * @param position La posición del elemento a visualizar
	 */
	setVisible(position: number){
		this.userDataVisible = false
		this.updateUserDataVisible = false
		this.privacyAndSecurityVisible = false
		if(position == 0)
		{
			this.userDataVisible = true
		}else if(position == 1)
		{
			this.updateUserDataVisible = true
		}else if(position == 2)
		{
			this.privacyAndSecurityVisible = true
		}
		this.sidebarOpen = false
	}

	showMenu(position: number){
		this.setVisible(position)
	}

	updateUserInfoRequest(form: NgForm){
		const username = form.value.username;
    	const body = JSON.stringify({
				username : username
			})
		this.apiService.httpPut<any>('/user/edit', body, true, true).subscribe(
			data => {
				if(data.status=200){
					window.location.reload(); //Recargar página si la respuesta es correcta
					localStorage.setItem('username', username)
				}
			}
		)
	}

	sidebarOpen: boolean = false;

	toggleSidebar() {
		this.sidebarOpen = !this.sidebarOpen;
	}
}
