import { IUsuario } from './IUsuario';

export interface IArrendero {
    idArrendero?: number;
    direccionActual?: string;
    nroPartidaRegistral?: number;
    departamento?:any;
    provincia?:any;
    distrito?:any;
    usuario?: IUsuario;

}