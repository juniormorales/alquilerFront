import { IRenta } from './IRenta';
import { IArrendero } from './IArrendero';

export interface IPago {

    idPago?: number;
    monto?:number;
    urlVoucher?: string;
    estado?: boolean;
    renta?: IRenta;
    arrendero?: IArrendero;
}