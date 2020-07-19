import { IRenta } from './IRenta';
import { IArrendero } from './IArrendero';
import { IInquilino } from './IInquilino';

export interface IPago {

    idPago?: number;
    monto?:number;
    montoRestante?:number;
    urlVoucher?: string;
    estado?: boolean;
    rechazado?:boolean;
    reciboCreado?:boolean;
    renta?: IRenta;
    arrendero?: IArrendero;
    inquilino?: IInquilino;
}