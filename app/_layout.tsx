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
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="login" options={{headerShown: false}} />
            <Stack.Screen name="home" options={{headerShown: false}} />
            <Stack.Screen name="onBoarding/uno" options={{headerShown: false}} />
            <Stack.Screen name="onBoarding/dos" options={{headerShown: false}} />
            <Stack.Screen name="onBoarding/tres" options={{headerShown: false}} />
            <Stack.Screen name="categorias" options={{headerShown: false}} />
            <Stack.Screen name="detalleBook" options={{headerShown: false}} />
            <Stack.Screen name="carrito" options={{headerShown: false}} />
            <Stack.Screen name="perfil" options={{headerShown: false}} />
            <Stack.Screen name="editBook" options={{headerShown: false}} />
            
          </Stack>
        </CartProvider>
      </LibrosSubidosProvider>
    </FavoritosProvider>
  );
}
 
