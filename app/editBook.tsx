import { Image, SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Alert } from "react-native";
import * as React from "react";
import { HeaderCarrito } from "@/components/HeaderCarrito";
import { LinearGradient } from "expo-linear-gradient";
import { BotonIcon } from "@/components/BotonIcon";
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { useLibrosSubidos } from '@/contexts/LibrosSubidosContext';
import { useRouter } from 'expo-router';

export default function EditBook() {
  const router = useRouter();
  const { agregarLibro } = useLibrosSubidos();
  
  const [titulo, setTitulo] = React.useState("");
  const [autor, setAutor] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [paginas, setPaginas] = React.useState("");
  const [anio, setAnio] = React.useState("");
  const [lenguaje, setLenguaje] = React.useState("");
  const [imagen, setImagen] = React.useState("https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360");
  
  const generos = [
    { key: '1', value: 'Ciencia Ficción' },
    { key: '2', value: 'Fantasia' },
    { key: '3', value: 'Terror' },
    { key: '4', value: 'Novela' },
    { key: '5', value: 'Infantil' },
  ];

  const lenguajes = [
    { key: '1', value: 'Español' },
    { key: '2', value: 'Ingles' },
  ];

  const camposCompletos = () => {
    return (
      titulo.trim() !== "" &&
      autor.trim() !== "" &&
      descripcion.trim() !== "" &&
      genero.trim() !== "" &&
      precio.trim() !== "" &&
      paginas.trim() !== "" &&
      anio.trim() !== "" &&
      lenguaje.trim() !== ""
    );
  };

  const handleSubirLibro = () => {
    if (!camposCompletos()) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    agregarLibro({
      titulo,
      autor,
      descripcion,
      genero,
      precio,
      paginas,
      anio,
      lenguaje,
      imagen
    });

    Alert.alert("Éxito", "Libro subido correctamente");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <HeaderCarrito titulo="Subir Libro" colorText="black" />  
        <ScrollView style={styles.containerScroll}>
          <View style={styles.overlayContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,1)", "transparent"]}
              start={{ x: 0, y: 0.7 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            />
            
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", gap:10, padding:10, width:"100%"}}>
                <Image style={styles.book} source={{ uri: imagen }} />
                <View style={{gap:10}}>
                  <BotonIcon 
                    icono="image"
                    tamaño={18}
                    texto="Subir Imagen " 
                    colorButton="#AC0505"  
                    ancho={170}
                    onPress={() => Alert.alert("Info", "Funcionalidad de subir imagen no implementada")}
                  />
                  <BotonIcon 
                    icono="camera"
                    tamaño={18}
                    texto="Tomar Foto " 
                    colorButton="#AC0505"  
                    ancho={170} 
                    onPress={() => setImagen("https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360")}
                  />
                </View>
              </View>
              <View style={styles.containerText}>
                <TextInput
                  label="Titulo"
                  value={titulo}
                  onChangeText={setTitulo}
                  mode="flat"
                  style={styles.textInputStyle}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                />
                <TextInput
                  label="Autor"
                  value={autor}
                  onChangeText={setAutor}
                  mode="flat"
                  style={styles.textInputStyle}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                />
                <TextInput
                  label="Descripcion"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  mode="flat"
                  style={[styles.textInputStyle, styles.multilineInputStyle]}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                  multiline={true}
                  numberOfLines={4}
                />
                <View style={styles.containerDetalles}>
                  <TextInput
                    label="Precio"
                    value={precio}
                    onChangeText={setPrecio}
                    mode="flat"
                    style={styles.textInputDetalles}
                    activeUnderlineColor="#AC0505"
                    underlineColor="black"
                    textColor="black"
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="Paginas"
                    value={paginas}
                    onChangeText={setPaginas}
                    mode="flat"
                    style={styles.textInputDetalles}
                    activeUnderlineColor="#AC0505"
                    underlineColor="black"
                    textColor="black"
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="Año"
                    value={anio}
                    onChangeText={setAnio}
                    mode="flat"
                    style={styles.textInputDetalles}
                    activeUnderlineColor="#AC0505"
                    underlineColor="black"
                    textColor="black"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <SelectList 
                    setSelected={setGenero} 
                    data={generos} 
                    save="value"
                    placeholder="Género"
                    boxStyles={styles.selectStyle}
                    inputStyles={{color:"black", fontSize:18}}
                    dropdownStyles={{backgroundColor:"#dadada"}}
                  />
                  <SelectList 
                    setSelected={setLenguaje} 
                    data={lenguajes} 
                    save="value"
                    placeholder="Lenguaje"
                    boxStyles={styles.selectStyle}
                    inputStyles={{color:"black", fontSize:18}}
                    dropdownStyles={{backgroundColor:"#dadada"}}
                  />
                </View>
                <View style={styles.containerCompra}>
                  <BotonIcon 
                    alto={40} 
                    ancho={310} 
                    texto="Subir Libro" 
                    colorButton={camposCompletos() ? "#AC0505" : "#666666"}
                    onPress={handleSubirLibro}
                    disabled={!camposCompletos()}
                  />
                </View>
              </View>
            
          </View>
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
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerScroll: {
    marginVertical:5,
  },
  overlayContainer: {
    bottom: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  containerText: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  containerDetalles: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    gap: 10,
  },
  containerCompra: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 50,
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
  },
  textInputStyle: {
    backgroundColor: "rgba(255, 255, 255,0.6)",
    paddingHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#dadada',
  },
  textInputDetalles: {
    backgroundColor: "rgba(255, 255, 255,0.6)",
    paddingHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#dadada',
    flex: 1,
  },
  multilineInputStyle: {
    textAlignVertical: 'top',
    height: 100,
  },
  selectStyle: {
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255,0.6)",
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 0,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dadada",
  },
  description: {
    fontSize: 18,
    color: "#dadada",
  },
  book:{
    borderRadius: 10,
    height: 120,
    width: 80,
},
});