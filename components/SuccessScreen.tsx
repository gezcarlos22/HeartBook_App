import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";
import LottieView from 'lottie-react-native';

export const SuccessScreen = ({ onReturnHome }: { onReturnHome: () => void }) => {
  return (
    <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
    <View style={styles.container}>
      <Image source={require("@/assets/images/1.png")} style={styles.logo}/>
      <LottieView
        source={require('@/assets/images/gif.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text style={styles.successTitle}>¡Compra realizada con éxito!</Text>
      <Text style={styles.successMessage}>
        Tu pedido ha sido procesado correctamente. 
        Recibirás un correo con los detalles de tu compra.
      </Text>
      
      <TouchableOpacity
        style={styles.homeButton}
        onPress={onReturnHome}
      >
        <Text style={styles.homeButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: -80,
    marginTop: -40
  },
  animation: {
    width: 250,
    height: 200,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 15,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  homeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});