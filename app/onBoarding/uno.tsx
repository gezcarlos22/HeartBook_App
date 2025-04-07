import { SafeAreaView, StyleSheet, ImageBackground, View, Text, Image } from "react-native";
import * as React from "react";
import { BotonIcon } from "@/components/BotonIcon";
import { Link } from "expo-router";

export default function Uno() {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.overlayContainer}>
            <Image source={require("@/assets/images/bookshelves.png")} style={styles.logo}/>
            <View style={styles.containerText}>
              <Text style={styles.title}>Descubre mundos sin salir de casa</Text>
              <Text style={styles.description}>Busca entre miles de títulos, desde bestsellers hasta joyas escondidas. ¡Tu próxima lectura te espera!</Text>
            </View>
            <View style={styles.containerBoton}>
              <Link asChild href="/onBoarding/dos">
                <BotonIcon
                  alto={50}
                  ancho={150}
                  texto="Siguiente"
                  colorButton="#AC0505" 
                />
                </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerText: {
    flexDirection: "column",
    
    width: "100%",
    gap: 10,
  },
  containerBoton:{
    marginTop:20,
  },
  textInputStyle: {
    backgroundColor: "rgba(255,255,255,1)",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  overlayContainer: {
    //backgroundColor: "rgba(255,255,255,0.6)",
    height: "90%",
    width: "90%",
    borderRadius: 40,
    paddingHorizontal: 10,
    justifyContent: "center", 
    alignItems: "center", 
  },
  logo:{
    height:300,
    width:300
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  description: {
    textAlign:"center",
    fontSize: 18,
    color: "black",
  },
});