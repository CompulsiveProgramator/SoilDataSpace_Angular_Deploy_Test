import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Servicio con funciones de utilidad
export class UtilsService {

  constructor() { }

  //MÉTODOS

  /**
   * Devuelve la fecha actual
   */
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  //--- Validaciones de texto y de imagen ---

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

    // Devuelve true si son seguras para palabras y caracteres
    const insecureCharacters = keyCharacters.test(cleanText);
    const insecureWords = keyWords.test(cleanText);
    
    return !insecureCharacters && !insecureWords;
  }

  /**
   * Esta función coge el nombre completo de una imagen del backend y obtiene el nombre del archivo. Se usa en los modales de editar
   * noticia y evento para que se muestren las imagenes actuales.
   * 
   * Si se le pasa : "/uploads/events/6b49ec91-6543-437b-9d89-73f697a68230_Ronda.jpg"
   * Devuelve sólo : "Ronda.jpg"
   * 
   */
  extractBaseFileName(path: string): string {
  if (!path) {
    return '';
  }
  //--- Extraer nombre con ID---
  const lastSlashIndex = path.lastIndexOf('/');
  let fileNameWithId = path;
  if (lastSlashIndex !== -1) {
    fileNameWithId = path.substring(lastSlashIndex + 1);
  }
  //--- Quitar ID ---
  const underscoreIndex = fileNameWithId.indexOf('_');
  if (underscoreIndex !== -1) {
    return fileNameWithId.substring(underscoreIndex + 1); 
  }
  return fileNameWithId;
}
}
