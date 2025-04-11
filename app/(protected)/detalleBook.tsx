import * as React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BotonIcon } from "@/components/BotonIcon";
import { TextDetalles } from "@/components/TextDetalles";
import { useLocalSearchParams } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { useFavoritos } from '@/contexts/FavoritosContext';
import { HeaderCarrito } from "@/components/HeaderCarrito";
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native';
export default function DetalleBoock() {
  const { agregarAlCarrito, librosComprados } = useCart();
  const { agregarFavorito, removerFavorito, esFavorito } = useFavoritos();
  const libro = useLocalSearchParams();
  
  const libroActual = {
    imagen: typeof libro.imagen === "string" ? libro.imagen : "https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360",
    portada: typeof libro.portada === "string" ? libro.portada : "https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360",
    titulo: typeof libro.titulo === "string" ? libro.titulo : "Título no disponible",
    autor: typeof libro.autor === "string" ? libro.autor : "Autor no disponible",
    descripcion: typeof libro.descripcion === "string" ? libro.descripcion : "Descripción no disponible",
    genero: typeof libro.genero === "string" ? libro.genero : "Género no disponible",
    precio: typeof libro.precio === "string" ? parseFloat(libro.precio) : 0,
    paginas: typeof libro.paginas === "string"  ? parseInt(libro.paginas) : 0,
    anio: typeof libro.anio === "string" ? parseInt(libro.anio) : 0,
    lenguaje: typeof libro.lenguaje === "string" ? libro.lenguaje : "ES",
  };

  const esFavoritoActual = esFavorito(libroActual.titulo);
  const estaEnCarrito = librosComprados.some(libro => libro.titulo === libroActual.titulo);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(libroActual);
  };

  const handleFavoritoPress = () => {
    if (esFavoritoActual) {
      removerFavorito(libroActual.titulo);
    } else {
      agregarFavorito(libroActual);
    }
  };

  const navCarrito = () => {
    router.navigate("/(protected)/carrito")
  };

  const BookImage = React.memo(({ uri }: { uri: string }) => {
    const [isLoading, setIsLoading] = React.useState(true);
  
    return (
      <View style={styles.bookContainer}>
        <FastImage
          source={{ 
            uri: uri,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable
          }}
          style={styles.book}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => console.log("Error loading image")}
        />
        {isLoading && (
          <ActivityIndicator 
            style={styles.loadingIndicator} 
            size="large" 
            color="#AC0505" 
          />
        )}
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: libroActual.portada,
          }}
          style={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />

          <HeaderCarrito 
            colorText="white"  
            alturaImg={150} 
            cartItemCount={librosComprados.length} 
            onPress={navCarrito}
          />
        </ImageBackground>

        <View style={styles.overlayContainer}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradient}
          />
          <BookImage uri={libroActual.imagen} />
          <View style={styles.iconHeart}>
            <Text style={[styles.description, { textAlign:"center", fontSize: 14}]}>{libro.genero}</Text>
            <BotonIcon 
              icono="heart" 
              tamaño={20} 
              onPress={handleFavoritoPress}
              colorButton={esFavoritoActual ? "rgba(0, 0, 0, 0.6)": "rgba(0, 0, 0, 0.6)"}
              colorText={esFavoritoActual ? "black" : "white"}
              libro={libroActual}
            />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.title}>{libro.titulo}</Text>
            <Text style={[styles.description, { textAlign:"center"}]}>{libro.autor}</Text>
          </View>
          <TextDetalles paginas={libroActual.paginas} anio={libroActual.anio} lenguaje={libroActual.lenguaje}/>
          <View style={[{width:"100%", marginBottom:5}]}>
            <Text style={[styles.description, { fontSize: 18 }]}>Descripcion</Text>
          </View>
          <ScrollView> 
            <Text style={[styles.description, { fontSize: 14, color:"#666666" }]}>{libro.descripcion}</Text>
          </ScrollView>
          <View style={styles.containerCompra}>
            <View style={styles.containerPrecio}>
              <Text style={[styles.description, { fontSize: 14, color:"#666666" }]}>Precio</Text>
              <Text style={[styles.title, { fontSize: 25, color:"black",marginTop: -7,}]}>${libroActual.precio}</Text>
            </View>
            <View>           
              <BotonIcon 
                alto={40} 
                ancho={170} 
                texto={estaEnCarrito ? "En el carrito" : "Agregar al carrito"} 
                colorButton={estaEnCarrito ? '#4CAF50': "#AC0505"} 
                onPress={estaEnCarrito ? undefined : handleAgregarAlCarrito}
                disabled={estaEnCarrito}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    position: "absolute",
    top: 20,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom:10,
    alignItems:"center",
  },
  containerText: {
    flexDirection:"column",
    justifyContent:"center",
    margin:5,
    width:"100%"
  },
  containerCompra:{
    padding:5,
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"#dadada",
    height:50,
    width:"100%",
    borderRadius:30,
    marginTop:5,
  },
  containerPrecio:{
    justifyContent:"center",
    alignItems:"center",
    width:125
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dadada",
    textAlign: "center"
  },
  description: {
    fontSize: 18,
    color: "#dadada",
  },
  book: {
    borderColor: "#dadada",
    borderWidth: 1,
    borderRadius: 20,
    height: 200,
    width: 125,
    marginTop: -165,
  },
  iconHeart:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    alignItems:"center",
    marginTop:-40,
    marginBottom:-10,
  },
  bookContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
  },
  loadingIndicator: {
    position: 'absolute',
  },
});
