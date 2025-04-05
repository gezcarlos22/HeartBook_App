import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Icono } from "@/components/Icono";
import { useFavoritos } from '@/contexts/FavoritosContext';

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
  disabled?:boolean;
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
    
    // Colores para el estado de favorito
    const buttonColor = isFavorite ? "rgba(255, 255, 255, 0.6)" : colorButton;
    const iconColor = isFavorite ? "#AC0505" : colorText;

    return (
        <Pressable
          ref={ref}
          onPress={!disabled ? handlePress : undefined}
          style={({ pressed }) => [
            styles.customButton,
            { 
              backgroundColor: disabled 
                ? `${colorButton}80` // Añade transparencia cuando está deshabilitado
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
    );
  }
);

const styles = StyleSheet.create({
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
});

// Esto es opcional pero ayuda con el nombre del componente en React DevTools
BotonIcon.displayName = "BotonIcon";