import { IInquilino } from './IInquilino';

export interface IRenta {

    idRenta?: number;
    fechaRenta?:Date;
    cantidad?: number;
    estado?: number;
    importeAtrasado:number;
    inquilino?: IInquilino;
}