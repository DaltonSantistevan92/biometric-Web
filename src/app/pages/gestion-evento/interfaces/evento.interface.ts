export interface IEvento {
  status: boolean;
  message: string;
  data: Evento[];
}

export interface Evento {
  id?: number;
  nombre: string;
  fecha: Date;
  estado: string;
}

//interface personalizada para editar y guardar por http
export interface EventoEdSav {
    id?: number;
    nombre?: string;
    fecha?: Date;
    estado?: string;
}