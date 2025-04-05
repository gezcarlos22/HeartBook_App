import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text, TouchableOpacity} from "react-native";
import * as React from "react";
import { HeaderCarrito } from "@/components/HeaderCarrito";
import { LinearGradient } from "expo-linear-gradient";
import { BotonIcon } from "@/components/BotonIcon";
import { CardBusqueda } from "@/components/CardBusqueda";
import { useCart } from "@/contexts/CartContext";
import { Modal} from 'react-native';
import { Icono } from "@/components/Icono";

export default function Carrito() {
  const { librosComprados, eliminarDelCarrito, total } = useCart();
  const precioEnvio = 500; // Puedes ajustar esto según necesites

  // Estado para controlar el diálogo
  const [visible, setVisible] = React.useState(false);
  const [libroAEliminar, setLibroAEliminar] = React.useState<number | null>(null);

  const showDialog = (index: number) => {
    setLibroAEliminar(index);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setLibroAEliminar(null);
  };

  const confirmarEliminacion = () => {
    if (libroAEliminar !== null) {
      eliminarDelCarrito(libroAEliminar);
    }
    hideDialog();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <HeaderCarrito titulo="Carrito" colorText="black"/>
        <ScrollView style={styles.containerScroll}>

        {librosComprados.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>El carrito está vacío</Text>
          ) : (
           librosComprados.map((libro, index) => (
              <View key={index} style={styles.cardContainer}>
                <CardBusqueda
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
                  icono="trash-alt"
                  onPress={() => showDialog(index)}
                />
              </View>
            ))
          )}
        </ScrollView>

        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={hideDialog}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Icono icon="trash-alt" size={40} color="#AC0505" />
                <Text style={styles.modalTitle}>Eliminar libro</Text>
                <Text style={styles.modalText}>
                  ¿Estás seguro que deseas eliminar este libro de tu carrito?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelButton]} 
                    onPress={hideDialog}
                  >
                    <Text style={[styles.buttonText, {color:""}]}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.deleteButton]} 
                    onPress={confirmarEliminacion}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        
        <View style={styles.overlayContainer}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            start={{ x: 0, y: 0.7 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradient}
          />
          <View style={styles.containerText}>
            <View style={styles.containerTextPrice}>
              <Text style={styles.description}>Producto/s</Text>
              <Text style={styles.description}>${total}</Text>
            </View>
            <View style={styles.containerTextPrice}>
              <Text style={styles.description}>Envio</Text>
              <Text style={styles.description}>+${precioEnvio}</Text>
            </View>
            <View style={styles.containerTextPrice}>
              <Text style={styles.title}>Total</Text> 
              <Text style={[styles.title, { color:"#AC0505" }]}>${total + precioEnvio}</Text> 
            </View>
          </View>
          <View style={styles.containerCompra}>
            <BotonIcon alto={40} ancho={310} texto="Continuar compra" colorButton="#AC0505"/>
          </View>
        </View>
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
  containerScroll:{
    marginVertical:5,
  },
  overlayContainer: {
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom:10,
    alignItems:"center",
  },
  cardContainer: {
    position: 'relative',
  },

  containerText: {
    flexDirection:"column",
    //backgroundColor: "red",
    margin:5,
    width:"100%"
    //alignItems:"center"
  },
  containerCompra:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#dadada",
    height:50,
    width:"100%",
    borderRadius:30,
    marginTop:5,
  },
  containerTextPrice:{
    flexDirection:"row",
    justifyContent:"space-between"
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#AC0505',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: '#AC0505',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
 });