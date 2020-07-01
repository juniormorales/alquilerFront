export interface IUsuario {
    idUsuario?:number;
    username?: string;
    password?: string;
    email?: string;
    dni?: string;
    nombres?: string;
    apellidos?:string;
    telefono?:string;
    nroCel?:string;
    tipoUsuario?:string;
    fechaNacimiento?:Date;
    estado?:boolean;
    perfil?:any;
    fechaCreacion?:Date;
}