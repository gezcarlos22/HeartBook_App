import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icono } from "@/components/Icono";
import { useFavoritos } from '@/contexts/FavoritosContext';
import { Badge } from "react-native-paper";

interface BotonIconProps {
  texto?: string;
  icono?: string;
  tamaño?: number;
  onPress?: () => void;
  colorButton?: string;
  colorText?: string;
  ancho?: number;
  alto?: number;
  libro?: any;
  disabled?: boolean;
  badgeCount?: number;
}

export const BotonIcon = React.forwardRef<any, BotonIconProps>(
  (
    {
      icono,
      tamaño,
      onPress,
      texto,
      colorButton = "rgba(0, 0, 0, 0.6)",
      colorText = "white",
      ancho = 50,
      alto = 50,
      libro,
      disabled = false,
      badgeCount,
    },
    ref
  ) => {
    const { agregarFavorito, removerFavorito, esFavorito } = useFavoritos();
    
    const handlePress = () => {
      if (icono === 'heart' && libro) {
        if (esFavorito(libro.titulo)) {
          removerFavorito(libro.titulo);
        } else {
          agregarFavorito(libro);
        }
      }
      onPress?.();
    };

    const isFavorite = icono === 'heart' && libro && esFavorito(libro.titulo);
    
    const buttonColor = isFavorite ? "rgba(255, 255, 255, 0.6)" : colorButton;
    const iconColor = isFavorite ? "#AC0505" : colorText;

    return (
      <View style={styles.container}>
        <Pressable
          ref={ref}
          onPress={!disabled ? handlePress : undefined}
          style={({ pressed }) => [
            styles.customButton,
            { 
              backgroundColor: disabled 
                ? `${colorButton}80`
                : pressed 
                  ? "white" 
                  : colorButton, 
              width: ancho, 
              height: alto,
              opacity: disabled ? 0.7 : 1,
            },
          ]}
          disabled={disabled}
        >
          {({ pressed }) => (
            <>
              {texto !== undefined && (
                <Text style={[styles.text, { color: pressed ? "black" : colorText }]}>
                  {texto}
                </Text>
              )}
              {icono && (
                <Icono 
                  icon={icono} 
                  size={tamaño} 
                  color={pressed ? "black" : iconColor}
                  solid={isFavorite}
                />
              )}
            </>
          )}
        </Pressable>
        {icono === 'cart-shopping' && badgeCount !== undefined && badgeCount > 0 && (
          <Badge style={styles.badge}>{badgeCount}</Badge>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Necesario para posicionar el badge absolutamente
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  customButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  badge: {
    position: 'absolute',
    top: -5, // Ajusta para posicionar en la parte superior
    right: -5, // Ajusta para posicionar en la parte derecha
    backgroundColor: '#AC0505', // Color rojo para el badge
    color: 'white', // Color del texto
    fontSize: 12, // Tamaño del texto
    minWidth: 20, // Ancho mínimo
    height: 20, // Altura fija
    borderRadius: 10, // Bordes redondeados
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Esto es opcional pero ayuda con el nombre del componente en React DevTools
BotonIcon.displayName = "BotonIcon";