import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoInterface } from '../../interfaces/video-interface';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { VideoServiceService } from '../../services/video-service.service';
import { VideoGridComponent } from '../../components/video-grid/video-grid.component';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { ScreenSizes, ScreenSizeServiceService } from '../../../../../shared/services/screen-size-service.service';

@Component({
  selector: 'app-videos-page',
  standalone: false,
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.css'
})
export class VideosPageComponent implements OnInit {
  //ATRIBUTOS
  shortVideoList!:VideoInterface[]; //Lista que se ve en el grid superior sólo con los yt shorts
  normalVideoList!:VideoInterface[]; //Lista que se ve enel grid inferior sólo con los videos normales de yt
  isCreateVideoVisible!:boolean;
  @ViewChild(VideoFormComponent) videoFormRef!: VideoFormComponent;
  //--- Grids de Videos ---
  @ViewChild('shortVideoGrid') shortVideoGridRef!: VideoGridComponent;
  @ViewChild('normalVideoGrid') normalVideoGridRef!: VideoGridComponent;
  //--- Responsive ---
  screenSize!:ScreenSizes;
  public readonly ScreenSizes = ScreenSizes; 

  //CONSTRUCTOR
  constructor(private videoService:VideoServiceService, private loginService:LoginService, private screenSizeService:ScreenSizeServiceService){}

  //MÉTODOS
  ngOnInit(): void {
    this.isCreateVideoVisible = this.loginService.checkPermissions("ROLE_MARKETING");
    //Suscribirse al evento de iniciar sesión para que en caso de que pase pille los permisos
    this.loginService.evento$.subscribe((msg) => {
      this.isCreateVideoVisible = this.loginService.checkPermissions("ROLE_MARKETING")});
    this.shortVideoList=[];
    this.normalVideoList=[];
    //--- Se hace aquí para que mediante asíncronía se carge la lista total y las listas parciales ---
    this.videoService.getAllVideos().subscribe(data => {
      console.log(data);
      //--- Llenar lista total de videos ---
      for (let video of data.video) {
        let newVideo : VideoInterface = video;
        this.videoService.videoList.unshift(newVideo);
      }
      console.log(this.videoService.videoList);
      
      //--- Llenar las listas más pequeñas ---
      for (const v of this.videoService.videoList){
        if (v.ytShort){
          this.shortVideoList.push(v)
        }else {
          this.normalVideoList.push(v)
        }
      }
      console.log(this.shortVideoList);
      this.shortVideoGridRef.initializeVideos();
      this.normalVideoGridRef.initializeVideos();
    });
    //--- Suscribirse al ScreenSizeService ---
    this.screenSizeService.currentScreenSize$
      .subscribe((size: ScreenSizes) => {
        this.screenSize = size;
    });
  }

  openVideoForm() {
    this.videoFormRef.showModal();
  }
}
