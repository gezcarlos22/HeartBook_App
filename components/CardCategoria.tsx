import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

interface CardCategoriaProps {
  imagen:string;
  titulo:string;
}

export const CardCategoria = ({imagen,titulo}:CardCategoriaProps) => {
  
  return (
    <Link href={{ pathname: "/categorias", params: { titulo, imagen } }} asChild>
      <Pressable>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: imagen,
          }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.gradient}
        />
        <View style={styles.containerText}>
          <Text style={styles.title}>{titulo}</Text>
        </View>
      </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  containerImage: { 
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 20,
    marginHorizontal: 10, 
    position: "relative", 
  },
  containerText: {
    position: "absolute",
    bottom: 10, 
    left: 10,
  },
  image: {
    borderRadius: 20,
    height: 75,
    width: "100%",
  },
  gradient: {
    position: "absolute",
    height: 40,
    width: "100%",
    borderRadius: 20,
    bottom: 0,
  },
  title: {
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#DADADA",
    paddingLeft:20,
  },
});