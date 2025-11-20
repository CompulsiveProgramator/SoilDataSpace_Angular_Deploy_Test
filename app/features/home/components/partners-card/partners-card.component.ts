import { Component, Input } from '@angular/core';
import { PartnersData } from '../../interfaces/partners-data';

@Component({
  selector: 'app-partners-card',
  standalone: false,
  templateUrl: './partners-card.component.html',
  styleUrl: './partners-card.component.css'
})
export class PartnersCardComponent {
  @Input() partnersData!:PartnersData;
}
