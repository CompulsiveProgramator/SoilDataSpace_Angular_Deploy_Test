import { Component, Input } from '@angular/core';
import { EventInterface } from '../../interfaces/event-interface';
import { UtilsService } from '../../../../../utils/utils.service';

@Component({
  selector: 'app-event-edit-image-item',
  standalone: false,
  templateUrl: './event-edit-image-item.component.html',
  styleUrl: './event-edit-image-item.component.css'
})
/**
 * Este componente es el pequeño texto con el nombre de una imagen del evento y el botón de borrar.
 */
export class EventEditImageItemComponent {
  //ATRIBUTOS
  @Input() deletedImageName!:string; //Imagen a borrar

  //--- Borrar imagenes que ya estaban ---
  @Input() eventItem!:EventInterface;

  //--- Borrar imagenes añadidas nuevas ---
  @Input() selectedFiles!: File[]; //lista con los archivos seleccionados
  @Input() fileNames!: string[]; //lista de nombres de los archivos
  @Input() fileTypes!: string[]; //lista de los formatos de archivos

  //CONSTRUCTOR
  constructor(private util:UtilsService) {
    
  }

  //MÉTODOS
  /**
   * Obtiene el nombre del archivo que tiene asignado
   */
  getFileName(){
    return this.util.extractBaseFileName(this.deletedImageName);
  }

  /**
   * Quita la imagen de la lista de imagenes del evento, borrandola del back.
   * Si la iamgen no está en la lista de imagenes del evento y es una de las imagenes nuevas añadidas,
   * las quita de la lista de imágenes seleccionadas.
   */
  onDelete(){
    // 1. Intentar borrar de las imágenes ANTIGUAS (URLs de BBDD en eventItem.images)
    const oldImageIndex = this.eventItem.images.findIndex(img => img === this.deletedImageName);
    
    // El índice -1 significa que no se encontró
    if (oldImageIndex !== -1) {
      // A. Es una imagen antigua: Eliminar del array de imágenes antiguas (URLs)
      this.eventItem.images.splice(oldImageIndex, 1);
      
      // B. Eliminar de la lista de nombres/URLs combinada (para que desaparezca de la UI)
      const combinedIndex = this.fileNames.findIndex(name => name === this.deletedImageName);
      if (combinedIndex !== -1) {
        this.fileNames.splice(combinedIndex, 1);
      }
      
    } else {
      // 2. Es un archivo NUEVO (un File en selectedFiles). 
      // Buscamos su índice en la lista combinada (fileNames) para obtener la posición de la UI.
      
      const newFilesStartIndex = this.eventItem.images.length;
      
      // Buscamos el índice en la parte de archivos nuevos (después de las imágenes antiguas)
      const combinedIndex = this.fileNames.findIndex((name, index) => 
        index >= newFilesStartIndex && name === this.deletedImageName
      );
      
      if (combinedIndex !== -1) {
        // A. Eliminar de la lista combinada (fileNames)
        this.fileNames.splice(combinedIndex, 1);
        
        // B. Calcular el índice relativo dentro de los arrays SÓLO NUEVOS
        const relativeNewFileIndex = combinedIndex - newFilesStartIndex;
        
        // C. Borrar de los arrays SOLO NUEVOS (los que se suben)
        if (relativeNewFileIndex >= 0 && relativeNewFileIndex < this.selectedFiles.length) {
          this.selectedFiles.splice(relativeNewFileIndex, 1); 
          this.fileTypes.splice(relativeNewFileIndex, 1);
        }
      } else {
         console.warn(`[Borrado] Archivo nuevo no encontrado: ${this.deletedImageName}`);
      }
    }
  }
  
}

