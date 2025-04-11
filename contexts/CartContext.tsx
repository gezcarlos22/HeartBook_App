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
    eliminarTodosLosLibros: () => void;
    total: number;
}

const CartContext = createContext<CartContextType>({
    librosComprados: [],
    agregarAlCarrito: () => {},
    eliminarDelCarrito: () => {},
    eliminarTodosLosLibros: () => {},
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

    const eliminarTodosLosLibros = () => {
        setLibrosComprados([]);
    };

    const total = librosComprados.reduce((sum, libro) => sum + libro.precio, 0);

    return (
        <CartContext.Provider value={{ 
            librosComprados, 
            agregarAlCarrito, 
            eliminarDelCarrito, 
            eliminarTodosLosLibros,
            total 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);