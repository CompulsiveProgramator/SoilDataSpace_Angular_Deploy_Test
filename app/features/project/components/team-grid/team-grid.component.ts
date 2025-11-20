import { Component } from '@angular/core';
import sectionsFile from '../../miembros-equipo.json'
import { SectionsFile, Section, Member } from '../../interfaces/team-types';

@Component({
	selector: 'app-team-grid',
	standalone: false,
	templateUrl: './team-grid.component.html',
	styleUrl: './team-grid.component.css'
})
export class TeamGridComponent {
	teamsSections: SectionsFile['sections'] = sectionsFile.sections;
}
