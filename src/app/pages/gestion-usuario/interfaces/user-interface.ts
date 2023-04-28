export interface InterfaceUsuario {
  status: boolean;
  message: string;
  data: Usuario[];
}

export interface Usuario {
  id: number;
  persona_id: number;
  rol_id: number;
  name?: string;
  email: string;
  email_verified_at?: any;
  imagen: string;
  estado: string;
  created_at: string;
  updated_at: string;
  persona: Persona;
  rol: Rol;
}

export interface Rol {
  id: number;
  cargo: string;
  estado: string;
}

export interface Persona {
  id: number;
  cedula?: string;
  nombres: string;
  apellidos?: string;
  num_celular?: string;
  direccion?: any;
  estado: string;
}