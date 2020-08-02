import { IArrendatario } from './IArrendatario';
import { IArrendero } from './IArrendero';

export interface ICalificacion {
    idCalificacion?:number;
    calificacion?:number;
    comentario?:string;
    arrendatario?:IArrendatario;
    arrendero?:IArrendero;
}