export interface VideoInterface {
    id:string,
    url:string, //IMPORTANTE: LA URL ES EL ID DEL VIDEO, NO LA URL COMPLETA
    title:string,
    date:string,
    ytShort:boolean //MUY IMPORTANTE: ESTO ES EL FORMATO DEL VIDEO, SI ES TRUE ES UN SHORT Y SE VE EN VERTICAL, SINO ES UN VIDEO LARGO Y SE VE EN HORIZONTAL
}
