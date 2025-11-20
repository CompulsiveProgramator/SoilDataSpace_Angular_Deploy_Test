import { AfterViewInit, Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { ApiServiceService } from '../../../../../core/services/api-service.service';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';

@Component({
  selector: 'app-image-carrousel',
  standalone: false,
  templateUrl: './image-carrousel.component.html',
  styleUrls: [
    "../../../../../../../node_modules/keen-slider/keen-slider.min.css",
    "./image-carrousel.component.css",
  ],
})
/**
 * Este componente contiene un carrusel de las imagenes del evento, estas se van rotando automáticamente.
 * Usa la librería keenslider para hacer el efecto
 */
export class ImageCarrouselComponent implements AfterViewInit, OnInit {
  //ATRIBUTOS
  @Input() imageList!:string[];
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>//Referencia al carrousel en el html

  slider!: KeenSliderInstance; //El objeto de slider, lo que va a definir como se ve el carrousel

  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 

  //CONSTRUCTOR
  constructor(private apiService:ApiServiceService, private screenSizeService:ScreenSizeServiceService){}

  //MÉTODOS
  ngOnInit() {
    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
      .subscribe((size: ScreenSizes) => {
        this.screenSize = size;
      });
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
      },
      [
        (slider) => {
          let timeout:any;
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 2000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  getImage(image:string) {
    return this.apiService.getFullUrl(image);
  }
}
