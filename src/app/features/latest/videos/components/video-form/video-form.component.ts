import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoErrorMessages, VideoServiceService } from '../../services/video-service.service';
import { UtilsService } from '../../../../../utils/utils.service';


@Component({
  selector: 'app-video-form',
  standalone: false,
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css'
})
export class VideoFormComponent implements OnInit {
  //ATRIBUTOS
  isVisible!:boolean;
  videoForm!:FormGroup;
  errorMessage!: string | null;
  errorActive!:boolean;

  //CONSTRUCTOR
  constructor(private fb:FormBuilder, private videoService:VideoServiceService, private util:UtilsService){}

  //MÉTODOS
  ngOnInit(): void {
    this.isVisible=false;
    this.errorActive=false;
    this.videoForm=this.fb.group({
      id:[''],
      title: ['', Validators.required],
      date: [this.util.getCurrentDate()], //Por defecto pasa la fecha actual
      url: ['', Validators.required],
      ytShort: [false, Validators.required]
    })

  }

  //--- Métodos visuales ---

  //--- Mostrar modal ----
  showModal(){
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; 
  }
  closeModal(){
    this.isVisible = false;
    this.hideError();
    document.body.style.overflow = '';
    this.videoForm.reset();
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
      this.videoService.uploadVideo( await this.videoService.parseFormDataToVideoInterface(this.videoForm));
      this.closeModal()
    } else {
      //Si falla la validación del formulario propia o la del objeto newsform devuelve el error
      this.showError(formValidation.errorCode);
    }
  }

}
