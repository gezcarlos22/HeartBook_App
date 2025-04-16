import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Icono } from "./Icono";

interface AlertModalProps {
  visible: boolean;
  onConfirm: () => void;
  title: string;
  message: string;
  icon: string;
  iconColor?: string;
  confirmText?: string;
  type?: "error" | "success" | "info";
}

export const AlertModal = ({
  visible,
  onConfirm,
  title,
  message,
  icon,
  iconColor = "#AC0505",
  confirmText = "Aceptar",
  type = "error",
}: AlertModalProps) => {
  const getButtonStyle = () => {
    switch (type) {
      case "success":
        return styles.successButton;
      case "info":
        return styles.infoButton;
      default: // error
        return styles.errorButton;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onConfirm}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Icono icon={icon} size={40} color={iconColor} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, getButtonStyle()]}
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
    justifyContent: "center",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  errorButton: {
    backgroundColor: "#AC0505",
  },
  successButton: {
    backgroundColor: "#4CAF50",
  },
  infoButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});