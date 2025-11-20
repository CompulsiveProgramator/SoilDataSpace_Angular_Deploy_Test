import { Injectable, signal } from '@angular/core';
import { CongressInterface } from '../interfaces/congress-interface';
import { ApiServiceService } from '../../../core/services/api-service.service';
import { LoginService } from '../../../core/auth/services/login.service';
import { FormGroup } from '@angular/forms';
import { pipe,map,tap, Subject } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

/**
 * Tipos de mensajes de error del formulario de congresos
 */
export enum congressErrorMessages {
	REQUIRED_PARAM_NOT_PROVIDED = "ERROR: No se pudo crear el congreso. Falta un campo obligatorio.",
	INVALID_CHARACTER = "ERROR: No se pudo crear el congreso. Se ha introducido un carácter no admitido (<>&\/).",
	INVALID_FORMAT = "ERROR: No se pudo crear el congreso. La imagen está en un formato no admitido."
}


@Injectable({
  	providedIn: 'root'
})
export class CongressService {
//ATRIBUTOS
	//--- Apartado visual ---
	defaultCongressImage = "assets/hero.png"; //Imagen por defecto 
	congressList : CongressInterface[] = []; //Lista de articulos
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
	 * Conversor de formdata a congressInterface
	 * Función que obtiene los valores de un formulario de noticia, los transforma
	 * a congressInterface y los devuelve, justo para poder añadirla como body a un post.
	 * Pasa como argumentos el formulario de noticia y el archivo a añadir
	 */
	async parseFormDataToCongressInterface(congressForm:FormGroup, file:File | null) : Promise<CongressInterface> {
		const formValue = congressForm.value;
		const newcongress: CongressInterface = {
		id: formValue.id,
		title: formValue.title,
		subtitle: formValue.subtitle,
		author: formValue.author,
		image: file || "",
		link: formValue.link,
		}
		return newcongress;
	}

	//--- Llamadas API ---
	/**
	 * Hace una llamada a la api con un get para consguir la lista de noticias en formato any (JSON)
	 * Las parsea a congressInterface, las añade al y lo devuelve
	 */
	getAllCongress(): CongressInterface[]{
		this.congressList = []; //vacía la lista antes de cargarla
		this.apiService.httpGet<any>(`/conference/public/all`).subscribe(data => {
			for (let congress of data.conference) {
				let newCongress : CongressInterface = congress;
				this.congressList.push(newCongress);
			}
		});
		return this.congressList;
	}

	/**
	 * Hace una llmada a la api con un POST para enviar la info de la noticia parseada a JSON
	 * Primero crea el body y el header del psot del post, y se lo pasa como argumento al httpclient
	 */
	createCongress(congress:CongressInterface) {
		const formData = new FormData(); //El body se crea como un FormData
		const _congress = {
			title: congress.title,
			subtitle: congress.subtitle,
			author: congress.author,
			link: congress.link,
		};
		formData.append('conference',new Blob([JSON.stringify(_congress)], { type: 'application/json' }))
		formData.append('file',congress.image);

		this.apiService.httpPost<any>(`/conference/marketing/conference`,formData).subscribe(
		data => {
			if(data.status=200){
				this.toastService.emitAction(1, "Congreso creado correctamente")
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
	deleteCongress(index:number){
		const congressId = this.congressList.at(index)?.id as string;

		this.apiService.httpDelete<any>(`/conference/marketing/conference/`+congressId).subscribe(
		data => {
			if(data.status=200){
				this.toastService.emitAction(2, "Congreso borrado correctamente")
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
	editCongress(article:CongressInterface, index:number) {
		const congressId = this.congressList.at(index)?.id as string;
		const formData = new FormData(); //El body se crea como un FormData
		const _article = {
			title: article.title,
			subtitle: article.subtitle,
			author: article.author,
			link: article.link,
		};
		formData.append('conference',new Blob([JSON.stringify(_article)], { type: 'application/json' }))
		formData.append('file',article.image);
		
		this.apiService.httpPut<any>(`/conference/marketing/conference/`+congressId,formData).subscribe(
			data => {
				if(data.status=200){
					this.toastService.emitAction(1, "Congreso editado correctamente")
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
	formValidation(congressForm: FormGroup, fileName: string | null, fileType: string) : {isValid: boolean, errorCode: congressErrorMessages | null} {
		//--- Validación de campos obligatorios
		if (congressForm.invalid){
			return {isValid:false, errorCode:congressErrorMessages.REQUIRED_PARAM_NOT_PROVIDED}
		}

		//--- Validación de texto ---
		const formValue = congressForm.value; //Pilla de los valores del formulario
		for (const [key, value] of Object.entries(formValue)){
			if ( key != 'image' && value != null ){
				if (!this.textValidation(value as string)){
				return {isValid:false, errorCode:congressErrorMessages.INVALID_CHARACTER}; //Si alguno del texto no cumple, devuelve false
				}
			}
		}

		//--- Validación de imagen ---
		if (fileName!=null){
			if (!this.imageValidation(fileType)) return {isValid:false, errorCode:congressErrorMessages.INVALID_FORMAT}; //Si no cumple la validación de iamgen, da false
		}

		return {isValid:true, errorCode:null};
	}
}
