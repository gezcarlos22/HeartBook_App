import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { BotonIcon } from "./BotonIcon";

interface CardBookProps {
    imagen?:string;
    titulo?:string;
    precio?:number;
    onPress?: () => void;
    colorCard?: string;
    colorText?: string;
    autor?:string;
    descripcion?:string;
    portada?:string;
    genero?:string, 
    paginas?:number, 
    anio?:number, 
    lenguaje?:string
  }

  export const CardBook = ({onPress,colorCard="",colorText="black",imagen,titulo,precio,portada,autor,descripcion,genero, paginas, anio, lenguaje}:CardBookProps) => {
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
          <View style={[styles.containerImage, { backgroundColor: colorCard }]}>
            <Image style={styles.book} source={{ uri: imagen }} />
            <View style={styles.containerBotonHeart}>
              <BotonIcon 
                icono="heart" 
                tamaño={20} 
                alto={40} 
                ancho={40} 
                libro={libro}
              />
            </View> 
            <View style={styles.containerText}>
              <Text style={[styles.title, { color: colorText }]}>{titulo}</Text>
              <Text style={[styles.price, { color: colorText }]}>{autor}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };


const styles = StyleSheet.create({
    containerImage: { 
      flexDirection:"column",
      justifyContent:"center",
      alignItems: "center",
      padding:5,
      borderRadius: 20,
      width: 135,
    },
    containerText:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:135,
        padding:5,
    },
    containerBotonHeart:{
      width:"100%",
      alignItems:"flex-end",
      marginTop:-50,
      padding:5
    },
    book:{
        borderRadius: 20,
        height:200,
        width:125,
    },
    title:{
        fontWeight:"bold", 
        fontSize: 12, 
        textAlign: "center"
    },                    
    price:{
        fontSize: 12, 
    }
  });