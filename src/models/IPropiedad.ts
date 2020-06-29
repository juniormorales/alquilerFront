import { ICondicionPago } from './ICondicionPago';
import { IArrendero } from './IArrendero';

export interface IPropiedad {
    idPropiedad?: number;
    alias?:string;
    fechaRegistro?: Date;
    descripcionGeneral?: string;
    descripcionDaños?: string;
    nroHabitaciones?: number;
    cantidadPisos?: number;
    tamano?: number;
    permiteMascotas?: boolean;
    condicionPropiedad?: string;
    estado?: number;
    condicionPago?: ICondicionPago;
    arrendero?: IArrendero;
}