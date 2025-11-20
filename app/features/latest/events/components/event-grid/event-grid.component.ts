import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../interfaces/event-interface';
import { CardColorStyle, CardTypes } from '../../../../../shared/interfaces/card-color-style';
import { EventServiceService } from '../../services/event-service.service';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-grid',
  standalone: false,
  templateUrl: './event-grid.component.html',
  styleUrl: './event-grid.component.css'
})
export class EventGridComponent implements OnInit {
  //ATRIBUTOS
  eventList!: EventInterface[];
  latestEvents!: EventInterface[];
  moreEvents!: EventInterface[]; 
  public readonly cardTypes = CardTypes; //exponer para que se pueda usar en el html

  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 

  //CONSTRUCTOR
  constructor(private eventService:EventServiceService, private screenSizeService:ScreenSizeServiceService) { }

  //MÉTODOS
  ngOnInit(): void {
    this.eventList=[];
    this.latestEvents=[];
    this.moreEvents=[];

    //--- Cargar eventos con asíncronia ---
    this.eventService.getAllEvents().subscribe(data => {
      
      for (let event of data.event) {
        let newEvent : EventInterface = event;
        this.eventService.eventList.unshift(newEvent);
      }
      //console.log(this.eventService.eventList);
      this.eventList = this.eventService.eventList;
      for (const [index, e] of this.eventService.eventList.entries()){
        if (index<3) {
          this.latestEvents.push(e);
        } else {
          this.moreEvents.push(e);
        }
      }
    });

    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
      .subscribe((size: ScreenSizes) => {
        this.screenSize = size;
      });

  }


  getCardColor(index: number): CardColorStyle {
        return this.eventService.eventColorStyleList[index % this.eventService.eventColorStyleList.length];
  }
  
}
