/**
 * Información para mostrar las tarjetas de los proovedores.
 * TODO: ESTO ESTÁ DE PRUEBAS, VOY A AÑADIR UN ENLACE A LOS METADATOS PARA QUE SE PUEDA
 * ACCEDER A LAS TABLAS DEL PROOVEDOR CUANDO YA SE JUNTE CON FIWARE
 */
export interface ProviderInterface {
    //id: string, //TODO: esto se va a usar cuando se conecte con la base de datos
    name: string,
    description: string,
    categories: string[], //Lista con los tipos de datos que tiene la organización, por ejemplo temperatura, hidro, agro...
    logo: string, //Logotipo de la organización (Está en base64 por ahora, por defento muestra el hero)
    //metadataLink:string //TODO: ponerlo luego para que funcione con fiware
}
