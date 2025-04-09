import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text, Image } from "react-native";
import * as React from "react";
import { HeaderCarrito } from "@/components/HeaderCarrito";
import { LinearGradient } from "expo-linear-gradient";
import { Segmented } from "@/components/SegmentedButtons";
import { DrawerMenu } from "@/components/DrawerMenu";

export default function Perfil() {
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/fondo30.jpg")}
          style={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0.9}}
            style={styles.gradient}
          />
          
          <HeaderCarrito 
            colorText="white" 
            icono="gear" 
            alturaImg={150} 
            imagen="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiW2ur1JV-AdfDCwzsZfEQC6lTh0qG191AqEiZqOazA85ZIn3tziTmGNldDrkR57tA5KMkJWddA_p-shkeO1Vej_V8wCfOGKpTIRd27D4JN1f3Nh4Nqk7zPImXtFXTzmHmjGJZdX4n0NbQM/s1600/C%25C3%25B3mo+armamos+el+fondo+bibliogr%25C3%25A1fico+de+una+biblioteca.jpg"
            onPress={toggleDrawer}
          />
        </ImageBackground>

        <View style={styles.overlayContainer}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/perfil.jpg")}
          />
          <View style={styles.containerText}>
            <Text style={styles.title}>Gez Carlos</Text>
            <Text style={styles.description}>Cordoba Argentina</Text>
          </View>
          <Segmented />
        </View>

        {/* Drawer Menu */}
        <DrawerMenu 
          visible={drawerVisible} 
          onClose={() => setDrawerVisible(false)} 
        />
      </View>
    </SafeAreaView>
  );
}
 
 const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    gradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    overlayContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "78%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20,
      paddingBottom:10,
      alignItems:"center",
    },
    avatar: {
      borderRadius: 100,
      height: 150,
      width: 150,
      marginTop: -100,
    },
    containerText: {
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        margin:10,
        marginTop:0,
        width:"100%"
      },
      containerBook:{
        backgroundColor:"rgba(0,0,0,0.4)",
        height:100,
        width:"100%"
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#dadada",
      },
      description: {
        fontSize: 18,
        color: "#dadada",
      },
  });
  