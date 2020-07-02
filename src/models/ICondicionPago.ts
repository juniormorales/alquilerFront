import { IArrendatario } from './IArrendatario';
import { IArrendero } from './IArrendero';

export interface ICondicionPago {
    
    idCondicionPago?: number;
    alias?:string;
    precio?: number;
    tiempoMinContrato?: number;
    montoMinGarantia?: number;
    montoMaxGarantia?: number;
    diaMesCobro?: number;
    responsabilidadReparar?: boolean;
    tasaRecargo?: number;
    arrendero?: IArrendero;

}