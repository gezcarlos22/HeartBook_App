import { Header } from "@/components/Header";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, ImageBackground } from "react-native";
import * as React from "react";
import { CardBook } from "@/components/CardBook";
import { CardCategoria } from "@/components/CardCategoria";
import { libros, librosUsados } from "@/data/libros"; 
import {categorias} from "@/data/categorias"// Importa tus datos de libros
import { Link } from "expo-router";

export default function Index() {
    return (
        <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <Header titulo="Hola Carlos" />
                <ScrollView>
                    <Text style={styles.titleTipe}>Los más Vendidos</Text>
                    <View style={styles.scrollWrapper}>
                        <ScrollView horizontal style={styles.containerScroll} showsHorizontalScrollIndicator={false}>
                        {libros.map((libro, index) => (
                                <View key={index} style={{ marginRight: 10 }}>
                                    <CardBook
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
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <Text style={styles.titleTipe}>Categorías</Text>
                    {categorias.map((categoria, index) => (
                                  <View key={index} style={{ marginBottom: 10, gap:10}}>
                                      <CardCategoria
                                          imagen={categoria.imagen}
                                          titulo={categoria.titulo}
                                      />
                            </View>
                        ))}
                    <Text style={styles.titleTipe}>Libros Usados</Text>
                    <View style={styles.cardWrapper}>
                    {librosUsados.map((libro, index) => (
                                <View key={index}>
                                    <CardBook colorCard="rgba(0, 0, 0, 0.2)"
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
                                    />
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  scrollWrapper: {
    position: "relative",
  },
  containerScroll: {
    height: 280,
    backgroundColor: "rgba(0, 0, 0, 0.2)",//"#dfdfdf",
    marginLeft: 10,
    paddingLeft:10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 10,
  },
  containerTab:{
    backgroundColor:"rgba(0, 0, 0, 0.6)",
    height:50,
    borderRadius:30,
    marginBottom:10,
    marginHorizontal:20,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: "wrap",
    gap:20,
    justifyContent: "center", 
  },
  titleTipe: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 20,
    margin: 10,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 40,
  },
});