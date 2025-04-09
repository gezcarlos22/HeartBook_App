import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Link, router } from "expo-router";
import { BotonIcon } from "./BotonIcon";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
    titulo?: string;
    colorText?: string;
    icono?: string;
    alturaImg?: number;
    imagen?: string;
    onPress?: () => void;
}

export const HeaderCarrito = ({ 
  onPress, 
  titulo, 
  colorText = "black", 
  icono = "trash-alt", 
  alturaImg = 150, 
  imagen 
}: HeaderProps) => {
    const volver = () => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.dismissTo("/(protected)/(tabs)/home");
        }
      };

    return (
        <View style={styles.outerContainer}>
            {imagen ? (
                <ImageBackground
                    source={{ uri: imagen }}
                    style={[styles.container, { height: alturaImg }]}
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.8)", "transparent"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradient}
                    />
                    <View style={styles.containerTitle}>
                        <BotonIcon icono="arrow-left-long" tamaño={20} onPress={volver}/>
                        <Text style={[styles.title, { color: colorText }]}>{titulo}</Text>
                        <BotonIcon icono={icono} tamaño={20} onPress={onPress} />
                    </View>
                </ImageBackground>
            ) : (
                <View style={[styles.container, { height: 75}]}>
                    <View style={[styles.containerTitle]}>
                        <BotonIcon icono="arrow-left-long" tamaño={20} onPress={volver}/>
                        <Text style={[styles.title, { color: colorText }]}>{titulo}</Text>
                        <BotonIcon icono={icono} tamaño={20} onPress={onPress} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: "hidden",
    },
    container: {
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        position: "absolute",
        top: 20,
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
