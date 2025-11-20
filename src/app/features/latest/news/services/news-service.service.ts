import { Injectable, signal } from '@angular/core';
import { NewsInterface } from '../interfaces/news-interface';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { LoginService } from '../../../../core/auth/services/login.service';
import { FormGroup } from '@angular/forms';
import { pipe,map,tap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';

/**
 * Tipos de mensajes de error del formulario de noticia
 */
export enum NewsErrorMessages {
  REQUIRED_PARAM_NOT_PROVIDED = "ERROR: No se pudo crear la noticia. Falta un campo obligatorio.",
  INVALID_CHARACTER = "ERROR: No se pudo crear la noticia. Se ha introducido un carácter no admitido (<>&\/).",
  INVALID_FORMAT = "ERROR: No se pudo crear la noticia. La imagen está en un formato no admitido."
}

@Injectable({
  providedIn: 'root'
})

//Se llama Service Service, se que es muy estupido pero bueno
export class NewsServiceService {
  //ATRIBUTOS
  //--- Apartado visual ---
  defaultNewsImage = "assets/hero.png"; //Imagen por defecto 
  defaultButtonText = "Visitar"; //Texto del botón por defecto
  newsColorStyleList = [
      {
        borderGradientColor:"emerald-500",
        categoryTextColor:"emerald-700",
        categoryAnimationColor:"emerald-500",
        titleTextColor:"emerald-500",
        buttonColor:"emerald-500",
        titleTextColorModal:"emerald-700", 
        categoryTextColorModal:"emerald-600",
        categoryAnimationColorModal:"emerald-500"
      },
      {
        borderGradientColor:"purple-500",
        categoryTextColor:"purple-600",
        categoryAnimationColor:"purple-600",
        titleTextColor:"purple-500",
        buttonColor:"purple-600",
        titleTextColorModal:"purple-600", 
        categoryTextColorModal:"purple-600",
        categoryAnimationColorModal:"purple-600"
      },
      {
        borderGradientColor:"blue-500",
        categoryTextColor:"blue-700",
        categoryAnimationColor:"blue-600",
        titleTextColor:"blue-500",
        buttonColor:"blue-600",
        titleTextColorModal:"blue-700", 
        categoryTextColorModal:"blue-600",
        categoryAnimationColorModal:"blue-600"
      }
  ]; //Lista de estilos colores para el carrusel y el modal que sé que funcionan
  //--- Listado de categorías de noticia ---
  defaultNewsCategories = ['Eventos','Jornadas','Novedades'] //Categorías por defecto
  newsCategoriesList!: string[]; //Lista con todas las categorías, incluye las categorías por defecto más todas las categorías que se han ido introduciendo en la base de datos

  newsList : NewsInterface[] = []; //Lista de noticias, son de tipo newsInterface

  //--- señales ---
  //private newsListChangedSignal = signal(0); //Señal que se activa cuando se añade 
  //public newsListChanged = this.newsListChangedSignal.asReadonly(); //forma

  //CONSTRUCTOR
  constructor(private apiService: ApiServiceService, private loginService: LoginService, private httpClient: HttpClient, private util:UtilsService) { }

  //MÉTODOS

  /**
   * Conversor de imagen a base64
   * recibe una imagen y devuelve un texto con la imagen codificada en base64
   */
  async base64Convert(img:File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Cuando la lectura termina correctamente, reader.result contiene un DataURL (string).
        reader.onload = () => resolve(reader.result);
        // En caso de error, rechazar
        reader.onerror = reject;
        // Convertir fichero a Base64
        reader.readAsDataURL(img);
    });
  }

  /**
   * Conversor de formdata a NewsInterface
   * Función que obtiene los valores de un formulario de noticia, los transforma
   * a NewsInterface y los devuelve, justo para poder añadirla como body a un post.
   * Pasa como argumentos el formulario de noticia y el archivo a añadir
   */
  async parseFormDataToNewsInterface(newsForm:FormGroup, file:File | null) : Promise<NewsInterface> {
    const formValue = newsForm.value;
    const newNews: NewsInterface = {
      id: formValue.id,
      title: formValue.title,
      date: formValue.date,
      author: formValue.author,
      category: formValue.category,
      image: formValue.image,
      description: formValue.description,
      content: formValue.content,
      link: formValue.link,
      buttonText: formValue.buttonText,
      file: file
      }
    return newNews;
  }

  /**
   * Función que genera una lista con todas las categorías disponibles para hacer un desplegable.
   * Toma tanto las categorías por defecto como las introducidas a mano en la base de datos hasta la fecha.
   */
  getNewsCategories(): string[] {
    this.newsCategoriesList = [];
    const newsCategoriesListnoUnique = [];
    //Obtener categorías únicas de la lista de noticias
    let allCategories = [];
    for (let n of this.newsList){
      allCategories.unshift(n.category)
    }
    const uniqueCategories = new Set(allCategories); //Utilizando Set se pillan los valores unicos de una lista
    //--- concatenar con lista de categorías ---
    for (let n of uniqueCategories.values()){
      newsCategoriesListnoUnique.unshift(n)
    }
    for (let n of this.defaultNewsCategories){
      newsCategoriesListnoUnique.unshift(n)
    }
    const newsCategoriesSet = new Set (newsCategoriesListnoUnique);
    this.newsCategoriesList = Array.from(newsCategoriesSet.values()); //Utilizar los valores únicos de ambos conjuntos
    return this.newsCategoriesList;
  }

  //--- Llamadas API ---
  /**
   * Hace una llamada a la api con un get para consguir la lista de noticias en formato any (JSON)
   * Las parsea a NewsInterface, las añade al y lo devuelve
   */
  getAllNews(): NewsInterface[]{
    this.newsList = []; //vacía la lista antes de cargarla
    this.apiService.httpGet<any>(`/news/public/all`).subscribe(data => {
      console.log(data);
      for (let news of data.news) {
        let newNews : NewsInterface = news;
        this.newsList.unshift(newNews);
      }
    });
    return this.newsList;
  }

  /**
   * Esta función devuelve un observable con la lista de todas las noticias, se usa para la página de noticias.
   * Para que se puedan actualizar las últimas 3 noticias y las demás de forma correcta
   */
  getAllNewsForNewsPage(): Observable<any>{
    this.newsList = []; //vacía la lista antes de cargarla
    return this.apiService.httpGet<any>(`/news/public/all`);
  }

  /**
   * Hace una llmada a la api con un POST para enviar la info de la noticia parseada a JSON
   * Primero crea el body y el header del psot del post, y se lo pasa como argumento al httpclient
   */
  createNews(news:NewsInterface) {
    const formData = new FormData(); //El body se crea como un FormData
    const _news = {
        title: news.title,
        date: news.date,
        author: news.author,
        category: news.category,
        description: news.description,
        content: news.content,
        link: news.link,
        buttonText: news.buttonText
      }; //Campo news de formData
    formData.append('news',new Blob([JSON.stringify(_news)], { type: 'application/json' })) //TODO PARSEARLO A JSON
    formData.append('file',news.file||"");

    this.apiService.httpPost<any>(`/news/marketing/news`,formData).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
    
  }

  /**
   * Hace una llamada a la api para hacer un delete
   * utiliza el indice de la lista local de noticias para obtener el id de la noticia que se quiere
   * borrar y luego la borra
   */
  deleteNews(index:number){
    const newsId = this.newsList.at(index)?.id as string;
  
    this.apiService.httpDelete<any>(`/news/marketing/news/`+newsId).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  /**
   * Hace una llamada a la api para editar la noticia seleccionada
   * utiliza el indice de la lista local de noticias para obtener el id de la noticia que se quiere editar
   * el cuerpo contiene los mismos campos que crear una noticia, salvo que estos no son obligatorios
   */
  editNews(news:NewsInterface, index:number) {
    const newsId = this.newsList.at(index)?.id as string; //Obtener el id de la noticia
    const formData = new FormData(); //El body se crea como un FormData
    const _news = {
        title: news.title,
        date: news.date,
        author: news.author,
        category: news.category,
        description: news.description,
        content: news.content,
        link: news.link,
        buttonText: news.buttonText,
        image:news.image || "" //Si no hay imagen pone un string vacío, esto lo lee el back para borrar la imagen
      }; //Campo news de formData
    console.log(_news)
    formData.append('news',new Blob([JSON.stringify(_news)], { type: 'application/json' })) //TODO PARSEARLO A JSON
    formData.append('file',news.file || "");
    console.log(_news);
    this.apiService.httpPut<any>(`/news/marketing/news/`+newsId,formData).subscribe(
      data => {
        if(data.status=200){
          window.location.reload(); //Recargar página si la respuesta es correcta
        }
      }
    );
  }

  //--- Seguridad ---

  /**
   * Ejecuta las validaciones de campos obligatorios, texto e imagen
   * Si la imagen está vacía, no hace las comprobaciones (usa la iamgen por defecto)
   * Devuelve un par {isValid,errorCode} donde el primero es un boolean que dice si 
   * la validación es correcta o no y un errorCode en caso de que sea erróneo
   */
  formValidation(newsForm: FormGroup, fileName: string | null, fileType: string) : {isValid: boolean, errorCode: NewsErrorMessages | null} {
    //--- Validación de campos obligatorios
    if (newsForm.invalid){
      return {isValid:false, errorCode:NewsErrorMessages.REQUIRED_PARAM_NOT_PROVIDED}
    }

    //--- Validación de texto ---
    const formValue = newsForm.value; //Pilla de los valores del formulario
    for (const [key, value] of Object.entries(formValue)){
      if (key!='date'&&key!='image'&&key!='file'&&value!=null){
        if (!this.util.textValidation(value as string)){
          return {isValid:false, errorCode:NewsErrorMessages.INVALID_CHARACTER}; //Si alguno del texto no cumple, devuelve false
        }
      }
     }
    //--- Validación de imagen ---
    if (fileName!=null&&fileName!=""&&fileType!=""){
       if (!this.util.imageValidation(fileType)) return {isValid:false, errorCode:NewsErrorMessages.INVALID_FORMAT}; //Si no cumple la validación de iamgen, da false
    }
    return {isValid:true, errorCode:null};
  }
    

}
