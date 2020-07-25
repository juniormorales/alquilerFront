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
    banco?: string;
    nro_boleta?:string;
    fechaConfirmado?:Date;
    renta?: IRenta;
    arrendero?: IArrendero;
    inquilino?: IInquilino;
}