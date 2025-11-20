import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoErrorMessages, VideoServiceService } from '../../services/video-service.service';
import { VideoInterface } from '../../interfaces/video-interface';

@Component({
  selector: 'app-video-edit-form',
  standalone: false,
  templateUrl: './video-edit-form.component.html',
  styleUrl: './video-edit-form.component.css'
})
export class VideoEditFormComponent implements OnInit {
  //ATRIBUTOS
  @Input() videoItem!: VideoInterface;

  isVisible!:boolean;
  videoForm!:FormGroup;
  errorMessage!: string | null;
  errorActive!:boolean;

  //CONSTRUCTOR
  constructor(private fb:FormBuilder, private videoService:VideoServiceService){}

  //MÉTODOS
  ngOnInit(): void {
    this.isVisible = true;
    this.errorActive = false;
    this.resetForm();
  }

  //--- Métodos visuales ---
  private resetForm(){
    this.isVisible=false;
    this.errorActive=false;
    this.videoForm=this.fb.group({
      id:[this.videoItem.id],
      title: [this.videoItem.title, Validators.required],
      date: [this.videoItem.date],
      url: [this.videoItem.url, Validators.required],
      ytShort: [this.videoItem.ytShort, Validators.required]
    })
  }

  //--- Mostrar modal ----
  showModal(){
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; 
  }
  closeModal(){
    this.isVisible = false;
    this.hideError();
    document.body.style.overflow = '';
    this.resetForm();
  }

  //--- Errores ---
  showError(errorCode: VideoErrorMessages | null){
    this.errorMessage = errorCode
    this.errorActive = true;
  }
  hideError(){
    this.errorActive = false;
  }

  //--- Métodos del formulario

  /**
   * Llamada API que sube el formulario, es asíncrona, espera a que la llamada desde el servicio
   * se complete para cerrar el modal*/
  async onSubmit() : Promise<void> {
    const formValidation = this.videoService.formValidation(this.videoForm)
    if (formValidation.isValid){
      const video = await this.videoService.parseFormDataToVideoInterface(this.videoForm);
      this.videoService.editVideo(video,video.id);
      this.closeModal()
    } else {
      //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
      this.showError(formValidation.errorCode);
    }
  }

}
