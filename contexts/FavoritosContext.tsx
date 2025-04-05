import React, { createContext, useContext, useState } from 'react';

interface Libro {
    imagen?: string;
    titulo?: string;
    precio?: number;
    autor?: string;
    descripcion?: string;
    portada?: string;
    genero?: string;
    paginas?: number;
    anio?: number;
    lenguaje?: string;
}

interface FavoritosContextType {
    librosFavoritos: Libro[];
    agregarFavorito: (libro: Libro) => void;
    removerFavorito: (titulo: string) => void;
    esFavorito: (titulo: string) => boolean;
}

const FavoritosContext = createContext<FavoritosContextType>({
    librosFavoritos: [],
    agregarFavorito: () => {},
    removerFavorito: () => {},
    esFavorito: () => false,
});

export const FavoritosProvider = ({ children }: { children: React.ReactNode }) => {
    const [librosFavoritos, setLibrosFavoritos] = useState<Libro[]>([]);

    const agregarFavorito = (libro: Libro) => {
        setLibrosFavoritos(prev => [...prev, libro]);
    };

    const removerFavorito = (titulo: string) => {
        setLibrosFavoritos(prev => prev.filter(libro => libro.titulo !== titulo));
    };

    const esFavorito = (titulo: string) => {
        return librosFavoritos.some(libro => libro.titulo === titulo);
    };

    return (
        <FavoritosContext.Provider value={{ librosFavoritos, agregarFavorito, removerFavorito, esFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => useContext(FavoritosContext);