export interface EventInterface {
    id:string,
    title:string,
    date:string,
    content:string,
    images:string[], //Se usa para mostrar imagenes y editarlas en caso que se quiera borrrar una de ellas o no cambiar
    files:File[] //Se usa para enviar imagenes y efitar en caso de que se tenga que sobreescribir alguna
}
