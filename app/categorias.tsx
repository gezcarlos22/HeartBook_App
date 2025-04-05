import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View } from "react-native";
import * as React from "react";
import { HeaderCategoria } from "@/components/HeaderCategoria";
import { CardBusqueda } from "@/components/CardBusqueda";
import { useLocalSearchParams } from "expo-router";
import { libros, librosUsados } from "@/data/libros"; 

export default function Categorias() {
  const { titulo, imagen } = useLocalSearchParams();
  
  // Filtrar libros y librosUsados por género que coincida con el título del HeaderCategoria
  const librosFiltrados = [...libros, ...librosUsados].filter(libro => libro.genero === titulo);
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <HeaderCategoria titulo={titulo as string} imagen={imagen as string} />
        <ScrollView>
          {librosFiltrados.map((libro, index) => (
            <View key={index} style={{ marginRight: 10 }}>
              <CardBusqueda
                imagen={libro.imagen}
                titulo={libro.titulo}
                precio={libro.precio}
                portada={libro.portada}
                autor={libro.autor}
                descripcion={libro.descripcion}
                genero={libro.genero}
                paginas={libro.paginas}
                anio={libro.anio}
                lenguaje={libro.lenguaje}
                icono="heart"
              />
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2F6F7",
  },
});

