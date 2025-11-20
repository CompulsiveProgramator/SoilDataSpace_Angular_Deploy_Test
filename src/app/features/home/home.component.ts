import { Component,OnInit,ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LoginService } from '../../core/auth/services/login.service';
import { NewsFormComponent } from '../latest/news/components/news-form/news-form.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit {
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
