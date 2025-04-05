import React, { createContext, useContext, useState } from 'react';

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
    agregarLibro: (libro: Omit<LibroSubido, 'id'>) => void;
}

const LibrosSubidosContext = createContext<LibrosSubidosContextType>({
    librosSubidos: [],
    agregarLibro: () => {},
});

export const LibrosSubidosProvider = ({ children }: { children: React.ReactNode }) => {
    const [librosSubidos, setLibrosSubidos] = useState<LibroSubido[]>([]);

    const agregarLibro = (libro: Omit<LibroSubido, 'id'>) => {
        const nuevoLibro = {
            ...libro,
            id: Date.now().toString(),
        };
        setLibrosSubidos(prev => [...prev, nuevoLibro]);
    };

    return (
        <LibrosSubidosContext.Provider value={{ librosSubidos, agregarLibro }}>
            {children}
        </LibrosSubidosContext.Provider>
    );
};

export const useLibrosSubidos = () => useContext(LibrosSubidosContext);