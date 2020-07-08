import { IRenta } from './IRenta';

export interface IPago {

    idPago?: number;
    monto?:number;
    urlVoucher?: string;
    estado?: boolean;
    renta?: IRenta;
}