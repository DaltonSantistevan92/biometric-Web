export interface IDepartamento{
  status: boolean;
  message: string;
  data: Departamento[];
}

export interface Departamento{
    id?: number;
    nombre: string;    
    estado: string;
}


