import { IInquilino } from './IInquilino';

export interface IContrato{
    idContrato?: number;
    fechaEmision?: Date;
    fechaInicio?: Date;
    tiempoContrato?: number;
    fechaFin?: Date;
    archivoContrato?: string;
    caduco?: boolean;
    garantia?:number;
    inquilino?:IInquilino;
}   