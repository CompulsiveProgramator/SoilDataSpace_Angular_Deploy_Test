import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsServiceService } from '../../services/news-service.service';
import { CardColorStyle } from '../../../../../shared/interfaces/card-color-style';
import { SafeUrl } from '@angular/platform-browser';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { NewsEditFormComponent } from '../news-edit-form/news-edit-form.component';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';

@Component({
    selector: 'app-news-modal',
    templateUrl: './news-modal.component.html',
    styleUrl: './news-modal.component.css',
    standalone: false,
})

export class NewsModalComponent implements OnInit{
  //ATRIBUTOS
  //--- Atributos que vienen del componente padre ---
  @Input() newsItem!: NewsInterface;
  @Input() newsIndex!: number;
  @Input() newsColorStyle!: CardColorStyle;
  @Input() finalImage!: SafeUrl | string;
  @Input() finalButtonText!: string;

  @Input() isVisible!:boolean;
  isDeleteNewsVisible!: boolean;

  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 
  
  @ViewChild(NewsEditFormComponent) newsEditForm!: NewsEditFormComponent; 

  //--- Constructor ---
  constructor(private newsService: NewsServiceService, private loginService: LoginService, private screenSizeService: ScreenSizeServiceService) {}

  //MÉTODOS
  ngOnInit(): void {
    //--- Recibir permisos ---
    this.isDeleteNewsVisible = this.loginService.checkPermissions("ROLE_MARKETING")
    
    this.loginService.evento$.subscribe(msg => {
      this.isDeleteNewsVisible = this.loginService.checkPermissions("ROLE_MARKETING")
    })

    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
      .subscribe((size: ScreenSizes) => {
        this.screenSize = size;
    });

    this.isVisible=false;
  }

  //MÉTODOS


  showModal(){
    this.isVisible=true;
    document.body.style.overflow = 'hidden'; //IMPORTANTE PARA QUE NO SE HAGA SCROLL DE LO DE ATRÁS
  }

  closeModal(){
    this.isVisible=false;
    document.body.style.overflow = '';
  }

  /**
   * Hace una llamada API para que se borre la noticia actual
   */
  onDelete(){
    this.isVisible=false;
    this.newsService.deleteNews(this.newsIndex);
  }

  /**
   * Vuelve esto componente invisible y hace visible al componente de
   * editar noticia
   */
  onEdit(){
    this.closeModal();
    this.newsEditForm.showModal();
  }

}
