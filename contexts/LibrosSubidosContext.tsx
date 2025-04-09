import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}

interface LibrosSubidosContextType {
    librosSubidos: LibroSubido[];
    agregarLibro: (libro: Omit<LibroSubido, 'id'>) => Promise<void>;
    eliminarLibro: (id: string) => Promise<void>;
    actualizarLibro: (id: string, libro: Omit<LibroSubido, 'id'>) => Promise<void>;
    cargarLibros: () => Promise<void>;
    borrarTodosLosLibros: () => Promise<void>; // Nuevo
}

const LibrosSubidosContext = createContext<LibrosSubidosContextType>({
    librosSubidos: [],
    agregarLibro: async () => {},
    eliminarLibro: async () => {},
    actualizarLibro: async () => {},
    cargarLibros: async () => {},
    borrarTodosLosLibros: async () => {},
});

export const LibrosSubidosProvider = ({ children }: { children: React.ReactNode }) => {
    const [librosSubidos, setLibrosSubidos] = useState<LibroSubido[]>([]);
    const STORAGE_KEY = 'LIBROS_SUBIDOS';

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
        const nuevoLibro = {
            ...libro,
            id: Date.now().toString(),
        };
        const nuevosLibros = [...librosSubidos, nuevoLibro];
        setLibrosSubidos(nuevosLibros);
        await guardarLibros(nuevosLibros);
    };

    const eliminarLibro = async (id: string) => {
        const nuevosLibros = librosSubidos.filter(libro => libro.id !== id);
        setLibrosSubidos(nuevosLibros);
        await guardarLibros(nuevosLibros);
    };

    const actualizarLibro = async (id: string, libro: Omit<LibroSubido, 'id'>) => {
        const nuevosLibros = librosSubidos.map(l => 
            l.id === id ? { ...libro, id } : l
        );
        setLibrosSubidos(nuevosLibros);
        await guardarLibros(nuevosLibros);
    };

    useEffect(() => {
        cargarLibros();
    }, []);

    const borrarTodosLosLibros = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setLibrosSubidos([]);
            console.log("Todos los libros han sido eliminados.");
        } catch (error) {
            console.error("Error al borrar todos los libros:", error);
        }
    };

    return (
        <LibrosSubidosContext.Provider 
    value={{ 
        librosSubidos, 
        agregarLibro, 
        eliminarLibro,
        actualizarLibro,
        cargarLibros,
        borrarTodosLosLibros // Añadido aquí
    }}
>
            {children}
        </LibrosSubidosContext.Provider>
    );
};

export const useLibrosSubidos = () => useContext(LibrosSubidosContext);