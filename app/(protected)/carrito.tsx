import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text, Modal } from "react-native";
import * as React from "react";
import { HeaderCarrito } from "@/components/HeaderCarrito";
import { LinearGradient } from "expo-linear-gradient";
import { BotonIcon } from "@/components/BotonIcon";
import { CardBusqueda } from "@/components/CardBusqueda";
import { useCart } from "@/contexts/CartContext";
import { ConfirmModal } from "@/components/ConfirmModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { router } from "expo-router";
import { SuccessScreen } from "@/components/SuccessScreen"

export default function Carrito() {
  const { librosComprados, eliminarDelCarrito, eliminarTodosLosLibros, total } = useCart();
  const precioEnvio = total/10;
  const [modalCompraVisible, setModalCompraVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);


  // Estados para los modales
  const [modalEliminarVisible, setModalEliminarVisible] = React.useState(false);
  const [modalEliminarTodosVisible, setModalEliminarTodosVisible] = React.useState(false);
  const [libroAEliminar, setLibroAEliminar] = React.useState<number | null>(null);

  const showDialog = (index: number) => {
    setLibroAEliminar(index);
    setModalEliminarVisible(true);
  };

  const confirmarEliminacion = () => {
    if (libroAEliminar !== null) {
      eliminarDelCarrito(libroAEliminar);
    }
    setModalEliminarVisible(false);
  };

  const confirmarEliminarTodos = () => {
    eliminarTodosLosLibros();
    setModalEliminarTodosVisible(false);
  };

  const handleConfirmPurchase = () => {
    eliminarTodosLosLibros();
    setModalVisible(false);
    setShowSuccessScreen(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <HeaderCarrito 
          titulo="Carrito" 
          colorText="black"
          icono={librosComprados.length > 0 ? "trash-alt" : "trash-alt"}
          onPress={() => librosComprados.length > 0 && setModalEliminarTodosVisible(true)}
        />
        
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

        {/* Modal para eliminar un libro */}
        <ConfirmModal
          visible={modalEliminarVisible}
          onCancel={() => setModalEliminarVisible(false)}
          onConfirm={confirmarEliminacion}
          title="Eliminar libro"
          message="¿Estás seguro que deseas eliminar este libro de tu carrito?"
          icon="trash-alt"
          confirmText="Eliminar"
        />

        {/* Modal para eliminar todos los libros */}
        <ConfirmModal
          visible={modalEliminarTodosVisible}
          onCancel={() => setModalEliminarTodosVisible(false)}
          onConfirm={confirmarEliminarTodos}
          title="Vaciar carrito"
          message="¿Estás seguro que deseas eliminar todos los libros de tu carrito?"
          icon="trash-alt"
          confirmText="Eliminar todos"
        />
        
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
              <Text style={styles.description}>+(10%) ${precioEnvio}</Text>
            </View>
            <View style={styles.containerTextPrice}>
              <Text style={styles.title}>Total</Text> 
              <Text style={[styles.title, { color:'#4CAF50' }]}>${total + precioEnvio}</Text> 
            </View>
          </View>
          <View style={styles.containerCompra}>
            <BotonIcon 
              alto={40} 
              ancho={310} 
              texto="Continuar compra" 
              colorButton={librosComprados.length > 0 ? '#4CAF50' : "#666666"}
              disabled={librosComprados.length === 0}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        
        <CheckoutModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onConfirm={handleConfirmPurchase} // Usamos la nueva función que vacía el carrito
          total={total}
          precioEnvio={precioEnvio}
        />

        {showSuccessScreen && (
          <Modal
            visible={showSuccessScreen}
            animationType="fade"
            transparent={false}
          >
            <SuccessScreen onReturnHome={() => {
              setShowSuccessScreen(false);
              router.dismissTo("/(protected)/(tabs)/home");
            }} />
          </Modal>
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
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerScroll: {
    marginVertical: 5,
  },
  overlayContainer: {
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  cardContainer: {
    position: 'relative',
  },
  containerText: {
    flexDirection: "column",
    margin: 5,
    width: "100%"
  },
  containerCompra: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 50,
    width: "100%",
    borderRadius: 30,
    marginTop: 5,
  },
  containerTextPrice: {
    flexDirection: "row",
    justifyContent: "space-between"
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
});