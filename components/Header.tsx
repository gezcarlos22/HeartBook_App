import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable} from "react-native";
import { Searchbar } from 'react-native-paper';
import { BotonIcon } from "./BotonIcon";
import { Link, router } from "expo-router";

interface HeaderProps {
    titulo: string;
    onSearch: (query: string) => void;
    cartItemCount?: number; // Nueva prop para el conteo del carrito
}

export const Header = ({ titulo, onSearch, cartItemCount }: HeaderProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch(query);
    };

    return ( 
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Link asChild href="/(protected)/(tabs)/perfil">
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={require("@/assets/images/perfil.jpg")}
                            />
                    </Pressable>
                </Link>
                <Text style={styles.title}>{titulo}</Text>
                <Link asChild href="/carrito">
                    <BotonIcon 
                      icono="cart-shopping" 
                      tamaño={20} 
                      badgeCount={cartItemCount} // Pasa el conteo del carrito
                    />
                </Link>
            </View>

            <View style={styles.containerSearchbar}>
                <Searchbar
                    placeholder="Buscar Libro"
                    onChangeText={handleSearch} // Usamos la nueva función
                    value={searchQuery}
                    elevation={0}
                    iconColor="white"
                    style={{
                        backgroundColor: verdeOscuro,
                    }}
                    theme={{
                        colors: {
                            onSurface: "white",
                            placeholder: "white",
                            onSurfaceVariant: "white",
                            primary: "#90EE90"
                        },
                    }}
                />
            </View>
        </View>
    );
};

const verdeOscuro = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        height: 150,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    contenidoTitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E2023",
        paddingVertical: 10,
        borderRadius: 30,
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
    avatar:{
        height:50,
        width:50,
        borderRadius:30,
    }
});