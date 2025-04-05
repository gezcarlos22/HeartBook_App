import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Searchbar } from "react-native-paper";
import { BotonIcon } from "./BotonIcon";
import { Link, useLocalSearchParams } from "expo-router"; // Importa useLocalSearchParams
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
    imagen: string;
    titulo: string;
}

export const HeaderCategoria = ({ imagen, titulo }: HeaderProps) => {

    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <View style={styles.outerContainer}>
            <ImageBackground source={{ uri: imagen }} style={styles.container}>
                {/* Gradiente vertical de arriba a abajo */}
                <LinearGradient
                    colors={["rgba(0,0,0,0.8)", "transparent"]}
                    start={{ x: 0, y: 0 }} // Empieza en la parte superior
                    end={{ x: 0, y: 0.5 }} // Termina en la parte inferior
                    style={styles.gradient}
                />

                <View style={styles.containerTitle}>
                    <Link asChild href="/">
                        <BotonIcon icono="arrow-left-long" tamaño={20} />
                    </Link>
                    <Text style={styles.title}>{titulo}</Text>
                    <Link asChild href="/carrito">
                        <BotonIcon icono="cart-shopping" tamaño={20} />
                    </Link>
                </View>

                <View style={styles.containerSearchbar}>
                    <Searchbar
                        placeholder="Buscar Libro"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        elevation={0}
                        iconColor="white"
                        style={{ backgroundColor: FondoColor}}
                        theme={{
                            colors: {
                                onSurface: "white",
                                placeholder: "white",
                                onSurfaceVariant: "white",
                                primary: "#90EE90",
                            },
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const defaultImage = "rgba(0, 0, 0, 0.7)"
const FondoColor = "rgba(0, 0, 0, 0.7)";

const styles = StyleSheet.create({
  outerContainer: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden", // Para recortar la imagen con bordes redondeados
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    height: 150,
    paddingTop: 20,
    position: "relative", // Necesario para el gradiente absoluto
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  containerSearchbar: {
    width: "100%",
    paddingHorizontal: 10,
  },
});