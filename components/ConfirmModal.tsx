import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Icono } from "./Icono";

interface ConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  icon: string;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  message,
  icon,
  iconColor = "#AC0505",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Icono icon={icon} size={40} color={iconColor} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#AC0505",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});