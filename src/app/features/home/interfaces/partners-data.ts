/**
 * Interfaz con la información necesaria para poder hacer las tarjetas de los colaboradores.
 * En caso de que se tengan que agregar más cosas como links o así está bien tenerlo como interfaz.
 * Tiene los mismos atributos que en el antiguo frontend.
 */
export interface PartnersData {
    abbr:string,
    name:string,
    desc:string,
    grad:string,
    bcol:string,
    logo:string,
    link:string
}
