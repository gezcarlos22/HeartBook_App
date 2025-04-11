import { SafeAreaView, StyleSheet, ImageBackground, View, Image, Alert } from "react-native";
import * as React from "react";
import { TextInput } from "react-native-paper";
import { BotonIcon } from "@/components/BotonIcon";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const router = useRouter();

  const camposCompletos = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleLogin = () => {
    if (camposCompletos()) {
      const success = login(email, password);
      if (success) {
        router.replace("/(protected)/(onBoarding)/uno");
      } else {
        Alert.alert("Error", "Email o contraseña incorrectos");
      }
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
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                style={styles.textInputStyle}
                activeOutlineColor="#AC0505"
                outlineColor="black"
                textColor="black"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.containerBoton}>
              <BotonIcon
                alto={50}
                ancho={300}
                texto="Iniciar Sesión"
                colorButton={camposCompletos() ? "#AC0505" : "#666666"}
                onPress={handleLogin}
                disabled={!camposCompletos()}
              />
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
    marginTop: -60,
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  containerBoton: {
    marginTop: 20,
  },
  textInputStyle: {
    backgroundColor: "rgba(255,255,255,1)",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  overlayContainer: {
    height: "90%",
    width: "90%",
    borderRadius: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },
  logo: {
    height: 350,
    width: 350
  },
});