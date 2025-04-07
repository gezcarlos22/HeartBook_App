import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text, Image } from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";
import { BotonIcon } from "@/components/BotonIcon";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const camposCompletos = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleCamposCompletos = () => {
    if (camposCompletos()) {
      // Aquí va la lógica para iniciar sesión o lo que haga tu botón
      console.log("Campos completos, botón presionado. Email:", email, "Password:", password);
      // Puedes llamar a tu función de autenticación aquí
    } else {
      console.log("Los campos no están completos.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.overlayContainer}>
            <Image source={require("@/assets/images/0.png")} style={styles.logo}/>
            <View style={styles.containerText}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.textInputStyle}
                activeOutlineColor="#AC0505"
                outlineColor="black"
                textColor="black"
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // Para ocultar la contraseña
                mode="outlined"
                style={styles.textInputStyle}
                activeOutlineColor="#AC0505"
                outlineColor="black"
                textColor="black"
              />
            </View>
            <View style={styles.containerBoton}>
              <Link asChild href="/onBoarding/uno">
                <BotonIcon
                  alto={50}
                  ancho={300}
                  texto="Iniciar Sesión" // Cambié el texto del botón para que coincida con la acción
                  colorButton={camposCompletos() ? "#AC0505" : "#666666"}
                  onPress={handleCamposCompletos} // Mantuve el nombre de la función, pero puedes cambiarlo
                  disabled={!camposCompletos()}
                />
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerText: {
    marginTop:-60,
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  containerBoton:{
    marginTop:20,
  },
  textInputStyle: {
    backgroundColor: "rgba(255,255,255,1)",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  overlayContainer: {
    //backgroundColor: "rgba(255,255,255,0.6)",
    height: "90%",
    width: "90%",
    borderRadius: 40,
    paddingHorizontal: 10,
    justifyContent: "center", // Centra los elementos dentro del overlay
    alignItems: "center", // Alinea los elementos horizontalmente al centro
    marginTop:-60,
  },
  logo:{
    height:350,
    width:350
  },
});