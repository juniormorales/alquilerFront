import { IArrendatario } from './IArrendatario';
import { IPropiedad } from './IPropiedad';

export interface ISolicitudPropiedad {
    idSolicitudPropiedad?: number;
    fechaSolicitud?: Date;
    estado?: number;
    tiempoArrendamiento?: number;
    nroHuespedPropuesto?: number;
    descripcionRechazo?: string;
    arrendatario?: IArrendatario;
    propiedad?: IPropiedad;
}