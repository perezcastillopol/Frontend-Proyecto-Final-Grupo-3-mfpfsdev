export interface IUserProfile {
  id: string;
  nombre: string;
  apellidos?: string;
  mail: string;
  foto?: string;
  descripcion?: string;
  intereses: string[];

  telefono?: string;
  fecha_nacimiento?: string; // 'YYYY-MM-DD'
  ubicacion?: string;
  estilo_viaje?: string;

  valoracion_promedio?: number;
}