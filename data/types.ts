export interface LibroBase {
    id: string; // Hacer obligatorio
    imagen: string;
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    precio: number;
    paginas: number;
    anio: number;
    lenguaje: string;
    portada: string; // Hacer obligatorio
  }
  
  export type LibroParams = Omit<LibroBase, 'precio' | 'paginas' | 'anio'> & {
    precio?: string;
    paginas?: string;
    anio?: string;
  };
  
  export const DEFAULT_IMAGE_URL = "https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360";