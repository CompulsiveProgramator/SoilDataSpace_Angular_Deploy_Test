import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { VideoInterface } from '../../interfaces/video-interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { VideoServiceService } from '../../services/video-service.service';
import { VideoEditFormComponent } from '../video-edit-form/video-edit-form.component';

@Component({
  selector: 'app-video-card',
  standalone: false,
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent implements OnInit {
  //ATRIBUTOS
  @Input() videoItem!:VideoInterface;
  @ViewChild(VideoEditFormComponent) videoEditFormRef!: VideoEditFormComponent;
  videoUrl!:SafeResourceUrl;
  isEditVisible!: boolean;

  //--- Web Responsive ---
  @Input() isMobile!:boolean;

  //CONSTRUCTOR
  constructor(private domSanitizer: DomSanitizer, private loginService: LoginService, private videoService: VideoServiceService) { }

  //MÉTODOS
  ngOnInit(): void {
    this.videoUrl=this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videoItem.url);
    this.isEditVisible = this.loginService.checkPermissions("ROLE_MARKETING");
    //Suscribirse al evento de iniciar sesión para que en caso de que pase pille los permisos
    this.loginService.evento$.subscribe((msg) => {
      this.isEditVisible = this.loginService.checkPermissions("ROLE_MARKETING")});
    console.log(this.videoEditFormRef);
  }

  onDelete() {
    this.videoService.deleteVideo(this.videoItem.id);
  }

  onEdit() {
    this.videoEditFormRef.showModal();
  }
}
