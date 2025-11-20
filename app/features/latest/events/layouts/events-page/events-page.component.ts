import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { EventFormComponent } from '../../components/event-form/event-form.component';

@Component({
  selector: 'app-events-page',
  standalone: false,
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent implements OnInit {
  //ATRIBUTOS
  isCreateEventVisible!:boolean;
  @ViewChild(EventFormComponent) eventFormRef!: EventFormComponent; 

  //CONSTRUCTOR
  constructor(private loginService:LoginService) { }

  //MÉTODOS
  ngOnInit(): void {
    this.isCreateEventVisible = this.loginService.checkPermissions("ROLE_MARKETING");
    this.loginService.evento$.subscribe((msg) => {this.isCreateEventVisible = this.loginService.checkPermissions("ROLE_MARKETING")});
  }

  openEventForm() {
    this.eventFormRef.showModal();
  }
}
