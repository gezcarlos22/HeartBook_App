import React, { createContext, useContext, useState } from 'react';

interface Libro {
    imagen: string;
    portada: string;
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    precio: number;
    paginas: number;
    anio: number;
    lenguaje: string;
}

interface CartContextType {
    librosComprados: Libro[];
    agregarAlCarrito: (libro: Libro) => void;
    eliminarDelCarrito: (index: number) => void;
    total: number;
}

const CartContext = createContext<CartContextType>({
    librosComprados: [],
    agregarAlCarrito: () => {},
    eliminarDelCarrito: () => {},
    total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [librosComprados, setLibrosComprados] = useState<Libro[]>([]);

    const agregarAlCarrito = (libro: Libro) => {
        setLibrosComprados([...librosComprados, libro]);
    };

    const eliminarDelCarrito = (index: number) => {
        const nuevosLibros = [...librosComprados];
        nuevosLibros.splice(index, 1);
        setLibrosComprados(nuevosLibros);
    };

    const total = librosComprados.reduce((sum, libro) => sum + libro.precio, 0);

    return (
        <CartContext.Provider value={{ librosComprados, agregarAlCarrito, eliminarDelCarrito, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);