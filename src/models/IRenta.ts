import { IInquilino } from './IInquilino';

export interface IRenta {

    idRenta?: number;
    fechaFinRenta?:Date;
    fechaIniRenta?:Date;
    cantidad?: number;
    estado?: number;
    importeAtrasado:number;
    envioPago?: number;
    montoAcumuladoCancelado?:number;
    inquilino?: IInquilino;
}