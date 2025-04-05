import React from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { BotonIcon } from "./BotonIcon";
import { Link } from "expo-router";

interface CardBusquedaProps {
    imagen?: string;
    titulo?: string;
    precio?: number;
    onPress?: () => void;
    autor?: string;
    descripcion?: string;
    portada?: string;
    genero?: string;
    paginas?: number;
    anio?: number;
    lenguaje?: string;
    icono?:string;
}

export const CardBusqueda = ({ onPress, imagen, titulo, precio, portada, autor, descripcion, genero, paginas, anio, lenguaje, icono}: CardBusquedaProps) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength).trim() + "...";
        }
        return text;
    };

    const libro = {
        imagen, titulo, precio, portada, autor, descripcion, genero, paginas, anio, lenguaje
    };

    return (
        <Link
            href={{
                pathname: "/detalleBook",
                params: {
                    portada,
                    imagen,
                    titulo,
                    precio,
                    autor,
                    descripcion,
                    genero,
                    paginas,
                    anio,
                    lenguaje,
                },
            }}
            asChild
        >
            <Pressable>
                <View style={styles.containerImage}>
                    <View style={styles.containerComponentes}>
                        <Image
                            style={styles.image}
                            source={{ uri: imagen }}
                        />
                        <View style={styles.containerText}>
                            <View>
                                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{truncateText(titulo || "", 80)}</Text>
                                <Text style={styles.autor}>{autor}</Text>
                                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                                    {truncateText(descripcion || "", 80)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerIcon}>
                        <BotonIcon icono={icono} tamaño={20} alto={40} ancho={40} onPress={onPress} libro={libro}/>
                        <Text style={styles.price}>${precio}</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    containerImage: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        height: 100,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        marginTop: 40,
    },
    containerComponentes: {
        flexDirection: "row",
        flex: 1,
    },
    containerText: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    containerIcon: {
        alignItems: "center",
        gap: 10,
    },
    image: {
        borderRadius: 10,
        height: 120,
        width: 80,
        marginTop: -30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    },
    autor: {
        fontSize: 14,
        color: "black",
    },
    description: {
        fontSize: 12,
        color: "black",
    },
    price: {
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    },
});
