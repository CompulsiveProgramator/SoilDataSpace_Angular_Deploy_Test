import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VideoInterface } from '../interfaces/video-interface';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { UtilsService } from '../../../../utils/utils.service';
import { Observable } from 'rxjs';

export enum VideoErrorMessages {
  REQUIRED_PARAM_NOT_PROVIDED = "ERROR: No se pudo crear la noticia. Falta un campo obligatorio.",
  INVALID_CHARACTER = "ERROR: No se pudo subir el vídeo. Se ha introducido un carácter no admitido (<>&\/).",
  INVALID_ID = "ERROR: No se pudo subir el vídeo. El vídeo no existe."
}

@Injectable({
  providedIn: 'root'
})

export class VideoServiceService {
  //ATRIBUTOS
  videoList:VideoInterface[]=[];

  //CONSTRUCTOR
  constructor(private apiService:ApiServiceService, private util:UtilsService) { }

  //MÉTODOS
  async parseFormDataToVideoInterface(videoForm:FormGroup) : Promise<VideoInterface> {
    const formValue = videoForm.value;
    const newVideo: VideoInterface = {
      id: formValue.id,
      title: formValue.title,
      date: formValue.date,
      url: formValue.url,
      ytShort: formValue.ytShort
      }
    return newVideo;
  }

  //--- Llamadas API ---

  /**
   * Devuelve un observable con la lista de vídeos que se pilla del back
   * */
  getAllVideos(): Observable<any>{
    this.videoList=[];
    return this.apiService.httpGet<any>(`/video/public/all`);
  }

  uploadVideo(video:VideoInterface) {
    const body = {
        title: video.title,
        date: video.date,
        url: video.url,
        ytShort: video.ytShort,
      };
    console.log(JSON.stringify(body));
    this.apiService.httpPost<any>(`/video/marketing/video`,body,true,true, 'application/json').subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  editVideo(video:VideoInterface, videoId:string){
    const body = {
      id: video.id,
      title: video.title,
      date: video.date,
      url: video.url,
      ytShort: video.ytShort,
    };
    this.apiService.httpPut<any>(`/video/marketing/video/`+videoId,body).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  /**
   * Recibe como parámetro el id del video a borrar
   */
  deleteVideo(videoId:string){
    this.apiService.httpDelete<any>(`/video/marketing/video/`+videoId).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  //--- Seguridad ---

  formValidation(videoForm: FormGroup) : {isValid: boolean, errorCode: VideoErrorMessages | null}  {
    //--- Validación de campos obligatorios
    if (videoForm.invalid){
      return {isValid:false, errorCode:VideoErrorMessages.REQUIRED_PARAM_NOT_PROVIDED}
    }

    //--- Validación de texto ---
    const formValue = videoForm.value; //Pilla de los valores del formulario
    for (const [key, value] of Object.entries(formValue)){
      if (key!='ytShort'&&value!=null){
        if (!this.util.textValidation(value as string)){
          return {isValid:false, errorCode:VideoErrorMessages.INVALID_CHARACTER}; //Si alguno del texto no cumple, devuelve false
        }
      }
    }
    return {isValid:true, errorCode:null};
  }
}
