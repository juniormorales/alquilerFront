import { IArrendatario } from './IArrendatario';
import { IPropiedad } from './IPropiedad';
import { IArrendero } from './IArrendero';

export interface IInquilino {
    idInquilino?:number;
    fechaConfirmacion?: Date;
    estado?: Boolean;
    contratoHecho?: Boolean;
    estadoPago?: Boolean;
    arrendatario?: IArrendatario;
    propiedad?: IPropiedad;
    arrendero?: IArrendero;
}