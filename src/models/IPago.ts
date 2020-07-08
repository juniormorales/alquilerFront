import { IRenta } from './IRenta';

export interface IPropiedad {

    idPago?: number;
    monto?:number;
    urlVoucher?: string;
    estado?: boolean;
    renta?: IRenta;
}