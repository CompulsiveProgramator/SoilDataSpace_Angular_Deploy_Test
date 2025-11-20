import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { PartnersData } from '../../interfaces/partners-data';

@Component({
  selector: 'app-partners-carrousel',
  standalone: false,
  templateUrl: './partners-carrousel.component.html',
  styleUrl: './partners-carrousel.component.css'
})
export class PartnersCarrouselComponent implements OnInit {

  //ATRIBUTOS
  @ViewChild('partnersScroller') partnersScrollerRef!: ElementRef<HTMLDivElement>;
  //Variables para que se ocule el botón si está en la esquina
  showLeftButton!:boolean;
  showRightButton!:boolean;

  //TODO: ESTO ESTA GUARRISIMO LO SUYO ES METERLO EN UN JSON Y LEERLO DESDE ALLI PERO BUENO
  partnersDataList: PartnersData[] = [
    {
      abbr: 'UJA',
      name: 'Universidad de Jaén',
      desc: 'Promotora y coordinación técnica; investigación, análisis y usuario',
      grad: 'from-blue-600 to-blue-800',
      bcol: 'bg-blue-100 text-blue-800',
      logo: 'assets/logos/uja.png',
      link: 'https://www.ujaen.es/'
    },
    {
      abbr: 'IFAPA',
      name: 'IFAPA (Junta de Andalucía)',
      desc: 'Productor/consumidor de datos; coordinación de políticas y usuario',
      grad: 'from-green-600 to-green-800',
      bcol: 'bg-green-100 text-green-800',
      logo: 'assets/logos/ifapa.jpg',
      link: 'https://www.juntadeandalucia.es/agriculturaypesca/ifapa/web/'
    },
    {
      abbr: 'ITACyL',
      name: 'ITACyL (Junta de Castilla y León)',
      desc: 'Productor/consumidor de datos; coordinación de políticas y usuario',
      grad: 'from-red-500 to-red-700',
      bcol: 'bg-red-100 text-red-800',
      logo: 'assets/logos/itacyl.jpg',
      link: 'https://www.itacyl.es/'
    },
    {
      abbr: 'Esri',
      name: 'Esri España',
      desc: 'Proveedor tecnológico y facilitador (tecnología geoespacial)',
      grad: 'from-orange-500 to-orange-700',
      bcol: 'bg-orange-100 text-orange-800',
      logo: 'assets/logos/esri.jpg',
      link: 'https://www.esri.es/'
    },
    {
      abbr: 'Coop',
      name: 'Cooperativas Agroalimentarias de España',
      desc: 'Consumidor y usuario; agente tractor del sector agrícola',
      grad: 'from-yellow-500 to-yellow-700',
      bcol: 'bg-yellow-100 text-yellow-800',
      logo: 'assets/logos/coop.jpg',
      link: 'https://www.agro-alimentarias.coop/'
    },
    {
      abbr: 'Andaltec',
      name: 'Andaltec',
      desc: 'Centro tecnológico (plástico, materiales y transferencia)',
      grad: 'from-fuchsia-600 to-fuchsia-800',
      bcol: 'bg-fuchsia-100 text-fuchsia-800',
      logo: 'assets/logos/andaltec.png',
      link: 'https://www.andaltec.org/'
    },
    {
      abbr: 'CITOLIVA',
      name: 'CITOLIVA',
      desc: 'Centro tecnológico del olivar y el aceite',
      grad: 'from-rose-500 to-rose-700',
      bcol: 'bg-rose-100 text-rose-800',
      logo: 'assets/logos/citoliva.png',
      link: 'https://citoliva.es/'
    },
    {
      abbr: 'ceiA3',
      name: 'ceiA3',
      desc: 'Campus de Excelencia Internacional Agroalimentario',
      grad: 'from-violet-500 to-violet-700',
      bcol: 'bg-violet-100 text-violet-800',
      logo: 'assets/logos/CEIA3.png',
      link: 'https://www.ceia3.es/'
    },
    {
      abbr: 'FCRJ',
      name: 'Fundación Caja Rural de Jaén',
      desc: 'Apoyo institucional y ecosistema territorial',
      grad: 'from-amber-600 to-amber-800',
      bcol: 'bg-amber-100 text-amber-800',
      logo: 'assets/logos/CAJARURAL.jpg',
      link: 'https://www.grupocajarural.es/'
    },
    {
      abbr: 'D.O. SM',
      name: 'D.O. Sierra Mágina',
      desc: 'Denominación de Origen (sector oleícola)',
      grad: 'from-green-700 to-green-900',
      bcol: 'bg-green-100 text-green-800',
      logo: 'assets/logos/sierraMagina.png',
      link: 'https://sierramagina.org/'
    },
    {
      abbr: 'COI',
      name: 'Consejo Oleícola Internacional',
      desc: 'Organismo internacional del sector oleícola',
      grad: 'from-slate-600 to-slate-800',
      bcol: 'bg-slate-100 text-slate-800',
      logo: 'assets/logos/COI.png',
      link: 'https://www.internationaloliveoil.org/'
    },
    {
      abbr: 'ASAJA',
      name: 'ASAJA',
      desc: 'Asociación agraria; representación de agricultores',
      grad: 'from-emerald-700 to-emerald-900',
      bcol: 'bg-emerald-100 text-emerald-800',
      logo: 'assets/logos/asaja.jpg',
      link: 'https://www.asaja.com/'
    },
    {
      abbr: 'COAG',
      name: 'COAG',
      desc: 'Coordinadora de organizaciones de agricultores y ganaderos',
      grad: 'from-lime-700 to-lime-900',
      bcol: 'bg-lime-100 text-lime-800',
      logo: 'assets/logos/coag.jpg',
      link: 'https://www.coag.org/'
    },
    {
      abbr: 'UPA',
      name: 'UPA',
      desc: 'Unión de Pequeños Agricultores y Ganaderos',
      grad: 'from-teal-700 to-teal-900',
      bcol: 'bg-teal-100 text-teal-800',
      logo: 'assets/logos/upa.png',
      link: 'https://www.upa.es/'
    },
    {
      abbr: 'INFAOLIVA',
      name: 'INFAOLIVA',
      desc: 'Federación del sector oleícola',
      grad: 'from-yellow-600 to-yellow-800',
      bcol: 'bg-yellow-100 text-yellow-800',
      logo: 'assets/logos/infaoliva.png',
      link: 'https://www.infaoliva.com/'
    },
    {
      abbr: 'SIE',
      name: 'Sistemas Informáticos Europeos',
      desc: 'Tecnología y servicios TIC',
      grad: 'from-blue-500 to-blue-700',
      bcol: 'bg-blue-100 text-blue-800',
      logo: 'assets/logos/sie.jpg',
      link: 'https://www.sie.es/'
    },
    {
      abbr: 'JAV',
      name: 'JAV',
      desc: 'Empresa interesada en datos/servicios del espacio',
      grad: 'from-rose-600 to-rose-800',
      bcol: 'bg-rose-100 text-rose-800',
      logo: 'assets/logos/jav.jpg',
      link: 'https://jaenagro.com/'
    },
    {
      abbr: 'CONSULE',
      name: 'CONSULE',
      desc: 'Consultoría/servicios vinculados al ecosistema',
      grad: 'from-indigo-600 to-indigo-800',
      bcol: 'bg-indigo-100 text-indigo-800',
      logo: 'assets/logos/consule.png',
      link: 'https://grupoconsule.es/'
    },
    {
      abbr: 'Deere',
      name: 'John Deere',
      desc: 'Fabricante; agricultura de precisión y maquinaria',
      grad: 'from-green-500 to-green-700',
      bcol: 'bg-green-100 text-green-800',
      logo: 'assets/logos/deere.png',
      link: 'https://www.deere.es/'
    },
    {
      abbr: 'Fertina',
      name: 'Fertinagro Biotech',
      desc: 'Bio/Agrotech; fertilización y suelos',
      grad: 'from-amber-500 to-amber-700',
      bcol: 'bg-amber-100 text-amber-800',
      logo: 'assets/logos/ferti.jpg',
      link: 'https://fertinagro.es/'
    },
    {
      abbr: 'Cajamar',
      name: 'Cajamar',
      desc: 'Finanzas/cooperativismo agro; innovación sectorial',
      grad: 'from-sky-500 to-sky-700',
      bcol: 'bg-sky-100 text-sky-800',
      logo: 'assets/logos/cajamar.jpg',
      link: 'https://www.cajamar.es/'
    },
    {
      abbr: 'NUTESCA',
      name: 'NUTESCA',
      desc: 'Empresa interesada en datos y analítica',
      grad: 'from-fuchsia-500 to-fuchsia-700',
      bcol: 'bg-fuchsia-100 text-fuchsia-800',
      logo: 'assets/logos/nutesca.png',
      link: 'https://www.nutesca.com/'
    },
  ]; //Lista con la información de todos los colaboradores

  ngOnInit(): void {
    this.showLeftButton=false;
    this.showRightButton=true;
  }

  //MÉTODOS
  private getStep(): number {
    const scroller = this.partnersScrollerRef.nativeElement;
    return Math.max(200, scroller.clientWidth * 0.75);
  }

  /**
   * Función que oculta los botones de izquierda y derecha cuando es necesario.
   */
  checkScroll() {
    const scroller = this.partnersScrollerRef.nativeElement;
    const tolerance = 2; 
    this.showLeftButton = scroller.scrollLeft > tolerance;
    this.showRightButton = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - tolerance;
  }


  /**
   * Desplaza el scroller a izquierda(-1) y derecha(1) utilizando un numero como
   * dirección en el eje x
   */
  scrollPartners(direction: number): void {
    const scroller = this.partnersScrollerRef.nativeElement;
    scroller.scrollBy({ 
      left: direction * this.getStep(), 
      behavior: 'smooth' 
    });
  }
  
  /**
   * Hace el desplazamiento del scroller usando la rueda del ratón
   */
  onWheelScroll(event: WheelEvent): void {
    const scroller = this.partnersScrollerRef.nativeElement;
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }

}
