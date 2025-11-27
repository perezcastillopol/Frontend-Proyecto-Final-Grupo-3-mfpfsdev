export interface UserProfile {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  mail: string;
  telefono: string;

  foto: string;
  descripcion: string;
  valoracion_promedio: number;

  fecha_registro: string;

  intereses?: string[];
  fecha_nacimiento?: string;
  ubicacion?: string;
  estilo_viaje?: string;
}
