import { Stack } from "expo-router";
import { CartProvider } from '@/contexts/CartContext'; 
import { FavoritosProvider } from '@/contexts/FavoritosContext';
import { LibrosSubidosProvider } from '@/contexts/LibrosSubidosContext';

export default function RootLayout() {
  return (
    <FavoritosProvider>
      <LibrosSubidosProvider>
        <CartProvider>
          <Stack>  
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(onBoarding)" options={{headerShown: false}} />
            <Stack.Screen name="categorias" options={{headerShown: false}} />
            <Stack.Screen name="detalleBook" options={{headerShown: false}} />
            <Stack.Screen name="carrito" options={{headerShown: false}} />
          </Stack>
        </CartProvider>
      </LibrosSubidosProvider>
    </FavoritosProvider>
  );
}
 
