import * as React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { CardBook } from './CardBook';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useLibrosSubidos } from '@/contexts/LibrosSubidosContext';

export const Segmented = () => {
  const [value, setValue] = React.useState('biblioteca');
  const { librosFavoritos } = useFavoritos();
  const { librosSubidos } = useLibrosSubidos();

  const renderCards = () => {
    if (value === 'favoritos') {
      return librosFavoritos.map((libro, index) => (
        <CardBook 
          key={`favorito-${index}`}
          colorCard="rgba(255, 255, 255,0.6)"
          imagen={libro.imagen}
          titulo={libro.titulo}
          precio={libro.precio}
          autor={libro.autor}
          descripcion={libro.descripcion}
          portada={libro.portada}
          genero={libro.genero}
          paginas={libro.paginas}
          anio={libro.anio}
          lenguaje={libro.lenguaje}
        />
      ));
    } else {
      // Renderizar los libros subidos en Mi Biblioteca
      return librosSubidos.map((libro, index) => (
        <CardBook 
          key={`subido-${libro.id}`}
          colorCard="rgba(255, 255, 255,0.6)"
          imagen={libro.imagen}
          titulo={libro.titulo}
          precio={parseFloat(libro.precio)}
          autor={libro.autor}
          descripcion={libro.descripcion}
          portada={libro.imagen} // Usamos la misma imagen como portada
          genero={libro.genero}
          paginas={parseInt(libro.paginas)}
          anio={parseInt(libro.anio)}
          lenguaje={libro.lenguaje}
        />
      ));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        theme={{
          colors: {
            primary: "black",
            onSecondaryContainer: "black",
            secondaryContainer: "#dadada",
            onSurface: "#dadada",
            outline: "#dadada"
          }
        }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'biblioteca',
            label: 'Mi Biblioteca',
          },
          {
            value: 'favoritos',
            label: 'Favoritos',
          },
        ]}
      />
      <ScrollView>
        <View style={styles.cardsContainer}>
          {renderCards()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center", 
    marginTop: 10,
    paddingBottom: 20, // Añade espacio al final
  },
});