import { Component, HostListener } from '@angular/core';
import { CongressService } from '../../services/congress.service';
import { CongressInterface } from '../../interfaces/congress-interface';
import { ViewChild } from '@angular/core';
import { CongressEditFormComponent } from '../congress-edit-form/congress-edit-form.component';
import { LoginService } from '../../../../core/auth/services/login.service';

@Component({
  selector: 'app-congress-grid',
  standalone: false,
  templateUrl: './congress-grid.component.html',
  styleUrl: './congress-grid.component.css'
})
export class CongressGridComponent {
	//ATRIBUTOS
	congressList!: CongressInterface[];
	@ViewChild(CongressEditFormComponent) congressEditForm!: CongressEditFormComponent; 
	hasMarketingPermission = false

	//CONSTRUCTOR
	constructor(private congressService: CongressService, private loginService: LoginService) {
		this.hasMarketingPermission = this.loginService.checkPermissions("ROLE_MARKETING")

		this.loginService.evento$.subscribe((msg) => {
           	this.hasMarketingPermission = this.loginService.checkPermissions("ROLE_MARKETING")
        })

		this.congressService.evento$.subscribe((msg) => {
			this.congressList = this.congressService.getAllCongress()
		})
	}

	//MÉTODOS
	ngOnInit(): void {
		this.congressList = this.congressService.getAllCongress();
	}

	onDelete(index: number){
		this.congressService.deleteCongress(index)
	}

	onEdit(congress: CongressInterface, index: number){
		this.congressEditForm.congressIndex = index
		this.congressEditForm.congressItem = congress
		this.congressEditForm.showModal()
	}
}
