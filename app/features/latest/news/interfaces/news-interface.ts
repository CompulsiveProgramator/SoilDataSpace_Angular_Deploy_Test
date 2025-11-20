/**
 * Clase que representa cómo se trata una noticia internamente
 */
export interface NewsInterface {
    id: string, //Cuando se conecte con el backend, hay que tener el id de la noticia
    title:string,
    date:string,
    author:string,
    category:string,
    image:string | null, //cuando se recibe una imagen, es un string
    description:string,
    content:string,
    link:string,
    buttonText:string,
    file:File | null //cuando se envía, es un file
}
