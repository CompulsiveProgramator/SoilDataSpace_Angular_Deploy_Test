import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { NewsFormComponent } from '../../components/news-form/news-form.component';
import { NewsServiceService } from '../../services/news-service.service';

@Component({
  selector: 'app-news-page',
  standalone: false,
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css'
})
export class NewsPageComponent {
    //ATRIBUTOS
    @ViewChild(NewsFormComponent) newsFormRef!: NewsFormComponent; //Referencia al componente de formulario de noticias
    isCreateNewsVisible !: boolean; //Variable que dice si se puede ver el botón de crear noticia o no
    
    //CONSTRUCTOR
    constructor (private loginService: LoginService) {}

    //MÉTODOS
    ngOnInit(): void {
        this.isCreateNewsVisible = this.loginService.checkPermissions("ROLE_MARKETING")

        this.loginService.evento$.subscribe((msg) => {
            this.isCreateNewsVisible = this.loginService.checkPermissions("ROLE_MARKETING")
        })
  
    }

    /**
     * Método que abre el formulario de noticias
     */
    openNewsForm() {
        this.newsFormRef.showModal();
    }
}
