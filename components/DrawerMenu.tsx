import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BotonIcon } from "./BotonIcon";
import { Link, router } from "expo-router";
import Modal from "react-native-modal";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerMenu = ({ visible, onClose }: DrawerMenuProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
    >
      <View style={styles.container}>
        {/* Sección de Información */}
        <Pressable 
          style={styles.menuItem}
          onPress={() => {
            router.push("/(protected)/(onBoarding)/uno");
            onClose();
          }}
        >
          <BotonIcon icono="circle-info" tamaño={20} />
          <Text style={styles.menuText}>Información</Text>
        </Pressable>

        {/* Sección Eliminar Libro */}
        <Pressable 
          style={styles.menuItem}
          onPress={() => {
            router.push("/");
            onClose();
          }}
        >
          <BotonIcon icono="trash-alt" tamaño={20} />
          <Text style={styles.menuText}>Eliminar libro</Text>
        </Pressable>

        {/* Sección Cerrar Sesión */}
        <Pressable 
          style={[styles.menuItem, styles.logoutItem]}
          onPress={() => {
            // Lógica para cerrar sesión
            router.replace("/login");
            onClose();
          }}
        >
          <BotonIcon icono="right-to-bracket" tamaño={20} />
          <Text style={[styles.menuText, styles.logoutText]}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    //width:"70%",
    margin: 0,
    justifyContent: "flex-start",
    alignItems:"flex-end"
  },
  container: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    color: "#333",
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  logoutText: {
    color: "#AC0505",
    fontWeight: "bold",
  },
});