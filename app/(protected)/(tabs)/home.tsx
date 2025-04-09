import { Header } from "@/components/Header";
import { Text, View, SafeAreaView, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from "react-native";
import * as React from "react";
import { useState } from "react";
import { CardBook } from "@/components/CardBook";
import { CardCategoria } from "@/components/CardCategoria";
import { CardBusqueda } from "@/components/CardBusqueda"; // Importamos el nuevo componente
import { libros, librosUsados } from "@/data/libros"; 
import { categorias } from "@/data/categorias";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [loadingMoreVendidos, setLoadingMoreVendidos] = useState(false);
  const [visibleVendidos, setVisibleVendidos] = useState(6);
  
  const [loadingMoreUsados, setLoadingMoreUsados] = useState(false);
  const [visibleUsados, setVisibleUsados] = useState(6);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setShowSearchResults(false);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    
    // Buscar en libros y librosUsados
    const results = [
      ...libros.filter(book => 
        book.titulo.toLowerCase().includes(lowerCaseQuery) || 
        book.autor.toLowerCase().includes(lowerCaseQuery)
      ),
      ...librosUsados.filter(book => 
        book.titulo.toLowerCase().includes(lowerCaseQuery) || 
        book.autor.toLowerCase().includes(lowerCaseQuery)
      )
    ];

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const loadMoreVendidos = () => {
    if (visibleVendidos >= libros.length || loadingMoreVendidos) return;
    
    setLoadingMoreVendidos(true);
    setTimeout(() => {
        setVisibleVendidos(prev => Math.min(prev + 6, libros.length));
        setLoadingMoreVendidos(false);
    }, 1000);
  };

  const loadMoreUsados = () => {
    if (visibleUsados >= librosUsados.length || loadingMoreUsados) return;
    
    setLoadingMoreUsados(true);
    setTimeout(() => {
        setVisibleUsados(prev => Math.min(prev + 6, librosUsados.length));
        setLoadingMoreUsados(false);
    }, 1000);
  };

  return (
    <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>

            <SafeAreaView style={styles.container}>
                <Header titulo="Hola Carlos" onSearch={handleSearch} />
                
                {/* Mostrar resultados de búsqueda o contenido normal */}
                {showSearchResults ? (
                    <View style={styles.searchResultsContainer}>
                        <Text style={styles.searchResultsTitle}>
                            Resultados de búsqueda para "{searchQuery}"
                        </Text>
                        <FlatList
                            data={searchResults}
                            renderItem={({ item }) => (
                                <CardBusqueda
                                    imagen={item.imagen}
                                    portada={item.portada}
                                    titulo={item.titulo}
                                    precio={item.precio}
                                    autor={item.autor}
                                    descripcion={item.descripcion}
                                    paginas={item.paginas}
                                    anio={item.anio}
                                    lenguaje={item.lenguaje}
                                    icono="heart" 
                                />
                            )}
                            keyExtractor={(item, index) => `${item.titulo}-${index}`}
                            contentContainerStyle={styles.searchResultsList}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={[{ key: 'main' }]}
                        renderItem={() => (
                            <>
                                {/* SECCIÓN MÁS VENDIDOS */}
                                <Text style={styles.titleTipe}>Los más Vendidos</Text>
                                <View style={styles.scrollWrapper}>
                                  <View style={styles.containerScroll}>
                                    <FlatList
                                        data={libros.slice(0, visibleVendidos)}
                                        renderItem={({ item }) => (
                                            <View style={{ marginRight: 10 }}>
                                                <CardBook
                                                    imagen={item.imagen}
                                                    titulo={item.titulo}
                                                    precio={item.precio}
                                                    portada={item.portada}
                                                    autor={item.autor}
                                                    descripcion={item.descripcion}
                                                    genero={item.genero}
                                                    paginas={item.paginas}
                                                    anio={item.anio}
                                                    lenguaje={item.lenguaje}
                                                />
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => `${item.titulo}-${index}`}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        ListFooterComponent={() => (
                                            loadingMoreVendidos ? (
                                                <View>
                                                    <ActivityIndicator />
                                                </View>
                                            ) : null
                                        )}
                                        onEndReached={loadMoreVendidos}
                                        onEndReachedThreshold={0.2}
                                        contentContainerStyle={styles.containerScrollBook}
                                    />
                                  </View>
                                </View>

                                {/* SECCIÓN CATEGORÍAS */}
                                <Text style={styles.titleTipe}>Categorías</Text>
                                {categorias.map((categoria, index) => (
                                    <View key={index} style={{ marginBottom: 10, gap: 10 }}>
                                        <CardCategoria
                                            imagen={categoria.imagen}
                                            titulo={categoria.titulo}
                                        />
                                    </View>
                                ))}
                                
                                {/* SECCIÓN LIBROS USADOS */}
                                <Text style={styles.titleTipe}>Libros Usados</Text>
                                <View style={styles.cardWrapper}>
                                    <FlatList
                                        data={librosUsados.slice(0, visibleUsados)}
                                        renderItem={({ item }) => (
                                            <View style={styles.bookItem}>
                                                <CardBook 
                                                    colorCard="rgba(0, 0, 0, 0.2)"
                                                    imagen={item.imagen}
                                                    titulo={item.titulo}
                                                    precio={item.precio}
                                                    portada={item.portada}
                                                    autor={item.autor}
                                                    descripcion={item.descripcion}
                                                    genero={item.genero}
                                                    paginas={item.paginas}
                                                    anio={item.anio}
                                                    lenguaje={item.lenguaje}
                                                />
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => `${item.titulo}-${index}`}
                                        numColumns={2}
                                        columnWrapperStyle={styles.cardWrapper}
                                        ListFooterComponent={() => (
                                            loadingMoreUsados ? (
                                                <View >
                                                    <ActivityIndicator />
                                                </View>
                                            ) : null
                                        )}
                                        onEndReached={loadMoreUsados}
                                        onEndReachedThreshold={0.2}
                                    />
                                </View>
                            </>
                        )}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                    />
                )}
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
    marginBottom:60,
  },
  scrollWrapper: {
    position: "relative",
  },
  containerScroll: {
    height: 280,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginLeft: 10,
    //paddingLeft:10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 10,
  },
  containerScrollBook: {
    paddingLeft:10,
  },
  cardWrapper: {
    flex: 1,
    alignContent:"center",
    justifyContent:"center",
    gap: 20,
  },
  titleTipe: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 20,
    margin: 10,
  },
  gradientContainer: {
    flex: 1, 
  },
  bookItem: {
    marginBottom: 15,
},
searchResultsContainer: {
    flex: 1,
    paddingHorizontal:5,
    paddingTop: 10,
  },
  searchResultsTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal:10,
  },
  searchResultsList: {
    paddingBottom: 20,
  },
});