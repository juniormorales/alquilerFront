import { IUsuario } from './IUsuario';

export interface IArrendatario {

    idArrendatario?:number;
    direccionTemporal?:string;
    usuario?: IUsuario;
}