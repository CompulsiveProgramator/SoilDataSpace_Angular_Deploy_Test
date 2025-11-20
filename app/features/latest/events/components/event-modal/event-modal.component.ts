import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventInterface } from '../../interfaces/event-interface';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { ApiServiceService } from '../../../../../core/services/api-service.service';
import { EventServiceService } from '../../services/event-service.service';
import { EventEditFormComponent } from '../event-edit-form/event-edit-form.component';

@Component({
  selector: 'app-event-modal',
  standalone: false,
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent implements OnInit {
  //ATRIBUTO
  @Input() eventItem!:EventInterface;
  @Input() eventColorStyle!:CardColorStyle;
  @ViewChild(EventEditFormComponent) eventEditref!:EventEditFormComponent;

  isVisible!:boolean;
  isEditEventVisible!: boolean;

  //CONSTRUCTOR
  constructor(private loginService:LoginService, private eventService:EventServiceService){}

  //MÉTODOS
  ngOnInit(): void {
    
    this.isEditEventVisible = this.loginService.checkPermissions("ROLE_MARKETING")

    this.loginService.evento$.subscribe(msg => {
      this.isEditEventVisible = this.loginService.checkPermissions("ROLE_MARKETING")
    })

    this.isVisible=false; 
  }

  showModal(){
    this.isVisible=true;
    document.body.style.overflow = 'hidden'; 
  }

  closeModal(){
    this.isVisible=false;
    document.body.style.overflow = '';
  }

  onDelete(){
    this.eventService.deleteEvent(this.eventItem.id);
    this.closeModal()
  }


  onEdit(){
    this.closeModal();
    this.eventEditref.showModal();
  }

}
