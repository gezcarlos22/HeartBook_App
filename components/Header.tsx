import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable} from "react-native";
import { Searchbar } from 'react-native-paper';
import { BotonIcon } from "./BotonIcon";
import { Link } from "expo-router";

interface HeaderProps {
    titulo: string;
}

export const Header = ({ titulo }: HeaderProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Link asChild href="/perfil">
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={require("@/assets/images/perfil.jpg")}
                            />
                    </Pressable>
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
                    style={{
                        backgroundColor: verdeOscuro, // Color constante
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
        backgroundColor: "rgba(0, 0, 0, 0.6)",//"#111E2F",
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