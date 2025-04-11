import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BotonIcon } from "./BotonIcon";
import { router } from "expo-router";
import ModalMenu from "react-native-modal";
import { Icono } from "./Icono";
import { useLibrosSubidos } from '@/contexts/LibrosSubidosContext';
import { ConfirmModal } from "./ConfirmModal";
import { useAuth } from "@/contexts/auth";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerMenu = ({ visible, onClose }: DrawerMenuProps) => {
  const { borrarTodosLosLibros } = useLibrosSubidos();
  const { logout } = useAuth();
  
  // States for confirmation modals
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleConfirmDelete = () => {
    borrarTodosLosLibros();
    setShowDeleteModal(false);
    onClose();
  };

  const handleConfirmLogout = () => {
    logout();
    router.replace("/");
    setShowLogoutModal(false);
    onClose();
  };

  return (
    <>
      <ModalMenu
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

          {/* Sección Eliminar Libros */}
          <Pressable 
            style={styles.menuItem}
            onPress={() => setShowDeleteModal(true)}
          >
            <BotonIcon icono="trash-alt" tamaño={20} />
            <Text style={styles.menuText}>Eliminar tus libros</Text>
          </Pressable>

          {/* Sección Cerrar Sesión */}
          <Pressable 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => setShowLogoutModal(true)}
          >
            <BotonIcon icono="right-to-bracket" tamaño={20} />
            <Text style={[styles.menuText, styles.logoutText]}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </ModalMenu>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar tus libros"
        message="¿Estás seguro que deseas eliminar todos los libros de tu biblioteca?"
        icon="trash-alt"
        confirmText="Eliminar"
      />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        title="Cerrar sesión"
        message="¿Estás seguro que deseas cerrar tu sesión?"
        icon="right-to-bracket"
        confirmText="Cerrar Sesión"
      />
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-end"
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
  // Modal styles
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
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});