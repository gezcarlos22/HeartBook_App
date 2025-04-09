import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text, FlatList } from "react-native";
import * as React from "react";
import { HeaderCategoria } from "@/components/HeaderCategoria";
import { CardBusqueda } from "@/components/CardBusqueda";
import { useLocalSearchParams } from "expo-router";
import { libros, librosUsados } from "@/data/libros"; 

export default function Categorias() {
  const { titulo, imagen } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredBooks, setFilteredBooks] = React.useState<any[]>([]);

  // Filtrar inicialmente por género
  React.useEffect(() => {
    const initialFilter = [...libros, ...librosUsados].filter(
      libro => libro.genero === titulo
    );
    setFilteredBooks(initialFilter);
  }, [titulo]);

  // Manejar búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      // Si la búsqueda está vacía, mostrar solo los libros del género
      const initialFilter = [...libros, ...librosUsados].filter(
        libro => libro.genero === titulo
      );
      setFilteredBooks(initialFilter);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    
    // Filtrar por género Y por título/autor
    const results = [...libros, ...librosUsados].filter(libro => 
      libro.genero === titulo && (
        (libro.titulo?.toLowerCase().includes(lowerCaseQuery) ?? false) || 
        (libro.autor?.toLowerCase().includes(lowerCaseQuery) ?? false)
      )
    );

    setFilteredBooks(results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <HeaderCategoria 
          titulo={titulo as string} 
          imagen={imagen as string} 
          onSearch={handleSearch} 
        />
        
        {filteredBooks.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              {searchQuery 
                ? `No se encontraron resultados para "${searchQuery}"`
                : `No hay libros disponibles en la categoría ${titulo}`}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredBooks}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <CardBusqueda
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
                  icono="heart"
                />
              </View>
            )}
            keyExtractor={(item, index) => `${item.titulo}-${index}`}
            contentContainerStyle={styles.listContent}
          />
        )}
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
  cardContainer: {
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});

