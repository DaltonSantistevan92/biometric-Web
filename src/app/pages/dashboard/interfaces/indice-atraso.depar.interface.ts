export interface IntAtrasoDepar {
  status: boolean;
  data: AtrasoDepart;
}

export interface AtrasoDepart {
  labels: string[];
  datos: string[];
}