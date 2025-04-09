import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Searchbar } from "react-native-paper";
import { BotonIcon } from "./BotonIcon";
import { Link, router} from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
    imagen: string;
    titulo: string;
    onSearch: (query: string) => void; // Nueva prop
}

export const HeaderCategoria = ({ imagen, titulo, onSearch }: HeaderProps) => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch(query); // Pasa la consulta al componente padre
    };

    const volver = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.dismissTo("/(protected)/(tabs)/home");
        }
    };

    return (
        <View style={styles.outerContainer}>
            <ImageBackground source={{ uri: imagen }} style={styles.container}>
                <LinearGradient
                    colors={["rgba(0,0,0,0.8)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.5 }}
                    style={styles.gradient}
                />

                <View style={styles.containerTitle}>
                    <BotonIcon icono="arrow-left-long" tamaño={20} onPress={volver}/>
                    <Text style={styles.title}>{titulo}</Text>
                    <Link asChild href="/carrito">
                        <BotonIcon icono="cart-shopping" tamaño={20} />
                    </Link>
                </View>

                <View style={styles.containerSearchbar}>
                    <Searchbar
                        placeholder="Buscar Libro"
                        onChangeText={handleSearch} // Usamos la nueva función
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