import { SafeAreaView, StyleSheet, ImageBackground, View, Text, Image } from "react-native";
import * as React from "react";
import { BotonIcon } from "@/components/BotonIcon";
import { Link } from "expo-router";

export default function Dos() {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.overlayContainer}>
            <Image source={require("@/assets/images/2.png")} style={styles.logo}/>
            <Image source={require("@/assets/images/BookLover.png")} style={styles.imagen}/>
            <View style={styles.containerText}>
              <Text style={styles.title}>Comparte tus tesoros literarios</Text>
              <Text style={styles.description}>¿Ya leíste ese libro hasta la última página? ¡Súbelo y gánale un dinero mientras encuentra un nuevo lector!</Text>
            </View>
            <View style={styles.containerBoton}>
              <Link asChild href="/(protected)/(onBoarding)/tres">
                <BotonIcon
                    alto={50}
                    ancho={150}
                    texto="Siguiente"
                    colorButton="#AC0505" 
                  />
              </Link>
              <Link dismissTo style={{fontWeight:"bold"}} href="/(protected)/(tabs)/home">Saltar</Link>
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
    gap:10,
    alignItems:"center"
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
    flex:1/3,
    height:150,
    width:150
  },
  imagen:{
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