import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

interface LibroSubido {
    id: string;
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    precio: string;
    paginas: string;
    anio: string;
    lenguaje: string;
    imagen: string;
    imagenThumbnail?: string;
}

interface LibrosSubidosContextType {
    librosSubidos: LibroSubido[];
    agregarLibro: (libro: Omit<LibroSubido, 'id'>) => Promise<void>;
    eliminarLibro: (id: string) => Promise<void>;
    actualizarLibro: (id: string, libro: Omit<LibroSubido, 'id'>) => Promise<void>;
    cargarLibros: () => Promise<void>;
    borrarTodosLosLibros: () => Promise<void>;
    generarThumbnail: (uri: string) => Promise<string>;
}

const LibrosSubidosContext = createContext<LibrosSubidosContextType>({
    librosSubidos: [],
    agregarLibro: async () => {},
    eliminarLibro: async () => {},
    actualizarLibro: async () => {},
    cargarLibros: async () => {},
    borrarTodosLosLibros: async () => {},
    generarThumbnail: async () => '',
});

export const LibrosSubidosProvider = ({ children }: { children: React.ReactNode }) => {
    const [librosSubidos, setLibrosSubidos] = useState<LibroSubido[]>([]);
    const STORAGE_KEY = 'LIBROS_SUBIDOS';

    const generarThumbnail = async (uri: string) => {
        try {
            const { uri: thumbnailUri } = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 200 } }],
                { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
            );
            return thumbnailUri;
        } catch (error) {
            console.error("Error generando thumbnail:", error);
            return uri;
        }
    };

    const cargarLibros = async () => {
        try {
            const librosGuardados = await AsyncStorage.getItem(STORAGE_KEY);
            if (librosGuardados) {
                setLibrosSubidos(JSON.parse(librosGuardados));
            }
        } catch (error) {
            console.error('Error cargando libros:', error);
        }
    };

    const guardarLibros = async (libros: LibroSubido[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(libros));
        } catch (error) {
            console.error('Error guardando libros:', error);
        }
    };

    const agregarLibro = async (libro: Omit<LibroSubido, 'id'>) => {
        try {
            const thumbnail = await generarThumbnail(libro.imagen);
            const nuevoLibro = {
                ...libro,
                id: Date.now().toString(),
                imagenThumbnail: thumbnail
            };
            const nuevosLibros = [...librosSubidos, nuevoLibro];
            setLibrosSubidos(nuevosLibros);
            await guardarLibros(nuevosLibros);
        } catch (error) {
            console.error('Error agregando libro:', error);
            throw error;
        }
    };

    const eliminarLibro = async (id: string) => {
        try {
            const libroAEliminar = librosSubidos.find(libro => libro.id === id);
            if (libroAEliminar) {
                // Eliminar imágenes del almacenamiento
                try {
                    if (libroAEliminar.imagen.startsWith(FileSystem.documentDirectory || '')) {
                        await FileSystem.deleteAsync(libroAEliminar.imagen);
                    }
                    if (libroAEliminar.imagenThumbnail && libroAEliminar.imagenThumbnail.startsWith(FileSystem.documentDirectory || '')) {
                        await FileSystem.deleteAsync(libroAEliminar.imagenThumbnail);
                    }
                } catch (error) {
                    console.error('Error eliminando imágenes:', error);
                }
            }

            const nuevosLibros = librosSubidos.filter(libro => libro.id !== id);
            setLibrosSubidos(nuevosLibros);
            await guardarLibros(nuevosLibros);
        } catch (error) {
            console.error('Error eliminando libro:', error);
            throw error;
        }
    };

    const actualizarLibro = async (id: string, libro: Omit<LibroSubido, 'id'>) => {
        try {
            const libroExistente = librosSubidos.find(l => l.id === id);
            const thumbnail = libro.imagen !== libroExistente?.imagen 
                ? await generarThumbnail(libro.imagen) 
                : libroExistente?.imagenThumbnail;

            const nuevosLibros = librosSubidos.map(l => 
                l.id === id ? { ...libro, id, imagenThumbnail: thumbnail } : l
            );
            setLibrosSubidos(nuevosLibros);
            await guardarLibros(nuevosLibros);
        } catch (error) {
            console.error('Error actualizando libro:', error);
            throw error;
        }
    };

    const borrarTodosLosLibros = async () => {
        try {
            // Eliminar todas las imágenes almacenadas
            await Promise.all(
                librosSubidos.map(async libro => {
                    try {
                        if (libro.imagen.startsWith(FileSystem.documentDirectory || '')) {
                            await FileSystem.deleteAsync(libro.imagen);
                        }
                        if (libro.imagenThumbnail && libro.imagenThumbnail.startsWith(FileSystem.documentDirectory || '')) {
                            await FileSystem.deleteAsync(libro.imagenThumbnail);
                        }
                    } catch (error) {
                        console.error('Error eliminando imágenes:', error);
                    }
                })
            );

            await AsyncStorage.removeItem(STORAGE_KEY);
            setLibrosSubidos([]);
        } catch (error) {
            console.error('Error borrando todos los libros:', error);
            throw error;
        }
    };

    useEffect(() => {
        cargarLibros();
    }, []);

    return (
        <LibrosSubidosContext.Provider 
            value={{ 
                librosSubidos, 
                agregarLibro, 
                eliminarLibro,
                actualizarLibro,
                cargarLibros,
                borrarTodosLosLibros,
                generarThumbnail
            }}
        >
            {children}
        </LibrosSubidosContext.Provider>
    );
};

export const useLibrosSubidos = () => useContext(LibrosSubidosContext);