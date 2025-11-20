import { Injectable, signal } from '@angular/core';
import { ArticlesInterface } from '../interfaces/articles-interface';
import { ApiServiceService } from '../../../core/services/api-service.service';
import { LoginService } from '../../../core/auth/services/login.service';
import { FormGroup } from '@angular/forms';
import { pipe,map,tap, Subject } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

/**
 * Tipos de mensajes de error del formulario de artículo
 */
export enum ArticlesErrorMessages {
	REQUIRED_PARAM_NOT_PROVIDED = "ERROR: No se pudo crear el artículo. Falta un campo obligatorio.",
	INVALID_CHARACTER = "ERROR: No se pudo crear el artículo. Se ha introducido un carácter no admitido (<>&\/).",
	INVALID_FORMAT = "ERROR: No se pudo crear el artículo. La imagen está en un formato no admitido."
}

@Injectable({
	providedIn: 'root'
})

export class ArticlesService {
	//ATRIBUTOS
	//--- Apartado visual ---
	defaultArticlesImage = "assets/hero.png"; //Imagen por defecto 
	articlesList : ArticlesInterface[] = []; //Lista de articulos
	private evento = new Subject<string>()
	evento$ = this.evento.asObservable()

	emitReloadEvent(mensaje: string) {
		this.evento.next(mensaje)
	}

	//CONSTRUCTOR
	constructor(private apiService: ApiServiceService, private loginService: LoginService, private toastService: ToastService) { }

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
	 * Conversor de formdata a articlesInterface
	 * Función que obtiene los valores de un formulario de noticia, los transforma
	 * a articlesInterface y los devuelve, justo para poder añadirla como body a un post.
	 * Pasa como argumentos el formulario de noticia y el archivo a añadir
	 */
	async parseFormDataToarticlesInterface(articlesForm:FormGroup, file:File | null) : Promise<ArticlesInterface> {
		const formValue = articlesForm.value;
		const newArticles: ArticlesInterface = {
		id: formValue.id,
		title: formValue.title,
		subtitle: formValue.subtitle,
		author: formValue.author,
		image: file || "",
		link: formValue.link,
		}
		return newArticles;
	}

	//--- Llamadas API ---
	/**
	 * Hace una llamada a la api con un get para consguir la lista de noticias en formato any (JSON)
	 * Las parsea a articlesInterface, las añade al y lo devuelve
	 */
	getAllArticles(): ArticlesInterface[]{
		this.articlesList = []; //vacía la lista antes de cargarla
		this.apiService.httpGet<any>(`/article/public/all`).subscribe(data => {
			for (let article of data.article) {
				let newArticle : ArticlesInterface = article;
				this.articlesList.push(newArticle);
			}
		});
		return this.articlesList;
	}

	/**
	 * Hace una llmada a la api con un POST para enviar la info de la noticia parseada a JSON
	 * Primero crea el body y el header del psot del post, y se lo pasa como argumento al httpclient
	 */
	createArticle(article:ArticlesInterface) {
		const formData = new FormData(); //El body se crea como un FormData
		const _article = {
			title: article.title,
			subtitle: article.subtitle,
			author: article.author,
			link: article.link,
		};
		formData.append('article',new Blob([JSON.stringify(_article)], { type: 'application/json' }))
		formData.append('file',article.image);

		this.apiService.httpPost<any>(`/article/marketing/article`,formData).subscribe(
		data => {
			if(data.status=200){
				this.toastService.emitAction(1, "Artículo creado correctamente")
				this.emitReloadEvent("")
			}
		}
		);
	}

	/**
	 * Hace una llamada a la api para hacer un delete
	 * utiliza el indice de la lista local de noticias para obtener el id de la noticia que se quiere
	 * borrar y luego la borra
	 */
	deleteArticles(index:number){
		const articlesId = this.articlesList.at(index)?.id as string;

		this.apiService.httpDelete<any>(`/article/marketing/article/`+articlesId).subscribe(
		data => {
			if(data.status=200){
				this.toastService.emitAction(2, "Artículo borrado correctamente")
				this.emitReloadEvent("")
			}
		}
		);
	}

	/**
	 * Hace una llamada a la api para editar la noticia seleccionada
	 * utiliza el indice de la lista local de noticias para obtener el id de la noticia que se quiere editar
	 * el cuerpo contiene los mismos campos que crear una noticia, salvo que estos no son obligatorios
	 */
	editArticles(article:ArticlesInterface, index:number) {
		const articlesId = this.articlesList.at(index)?.id as string;
		const formData = new FormData(); //El body se crea como un FormData
		const _article = {
			title: article.title,
			subtitle: article.subtitle,
			author: article.author,
			link: article.link,
		};
		formData.append('article',new Blob([JSON.stringify(_article)], { type: 'application/json' }))
		formData.append('file',article.image);
		
		this.apiService.httpPut<any>(`/article/marketing/article/`+articlesId,formData).subscribe(
			data => {
				if(data.status=200){
					this.toastService.emitAction(1, "Artículo editado correctamente")
					this.emitReloadEvent("")
				}
			}
		);
	}

	//--- Seguridad ---

	/**
	 * Comprobaciones de imagen, recibe como parámetro el tipo de la imagen
	 * Si la imagen es del tipo correcto, devuelve true
	 */
	imageValidation(fileType:string){
		const correctFileTypes = ['image/jpeg', 'image/png'];

		if (!correctFileTypes.includes(fileType)) return false

		return true
	}

	/**
	 * Comprobaciones de texto
	 * Si el texto no contiene caracteres problemáticos, devuelve true
	 */
	textValidation(text:string){
		// Expresiones regulares de url
		const urlRegex = /(?:https?:\/\/|ftps?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,})(?:\S*)/gi;

		// Caracteres y palabras reservadas para HTML y JS
		const keyCharacters = /[<>&\//]/g; 
		const keyWords = /(<script|javascript:|eval\(|onload=|onerror=|onmouseover=|document\.|window\.|alert\(|prompt\(|confirm\()/i;

		// Saltos de línea
		const lineBreaks = /[\n\r\t]/g;

		// Limpiar texto de saltos de línea
		var cleanText = text.replace(lineBreaks, '');

		// Limpiar texto de expresiones de url
		cleanText = cleanText.replace(urlRegex, '');

		// Devuelve true si son inseguras para palabras y caracteres
		const insecureCharacters = keyCharacters.test(cleanText);
		const insecureWords = keyWords.test(cleanText);
		
		return !insecureCharacters && !insecureWords;
	}

	/**
	 * Ejecuta las validaciones de campos obligatorios, texto e imagen
	 * Si la imagen está vacía, no hace las comprobaciones (usa la iamgen por defecto)
	 * Devuelve un par {isValid,errorCode} donde el primero es un boolean que dice si 
	 * la validación es correcta o no y un errorCode en caso de que sea erróneo
	 */
	formValidation(articlesForm: FormGroup, fileName: string | null, fileType: string) : {isValid: boolean, errorCode: ArticlesErrorMessages | null} {
		//--- Validación de campos obligatorios
		if (articlesForm.invalid){
			return {isValid:false, errorCode:ArticlesErrorMessages.REQUIRED_PARAM_NOT_PROVIDED}
		}

		//--- Validación de texto ---
		const formValue = articlesForm.value; //Pilla de los valores del formulario
		for (const [key, value] of Object.entries(formValue)){
			if ( key != 'image' && value != null ){
				if (!this.textValidation(value as string)){
				return {isValid:false, errorCode:ArticlesErrorMessages.INVALID_CHARACTER}; //Si alguno del texto no cumple, devuelve false
				}
			}
		}

		//--- Validación de imagen ---
		if (fileName!=null){
			if (!this.imageValidation(fileType)) return {isValid:false, errorCode:ArticlesErrorMessages.INVALID_FORMAT}; //Si no cumple la validación de iamgen, da false
		}

		return {isValid:true, errorCode:null};
	}
}
