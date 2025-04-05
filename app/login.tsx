import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Text,Image } from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
   return (
         <SafeAreaView>
            <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
                <View style={styles.overlayContainer}>
                    <LinearGradient
                                colors={["rgba(0,0,0,1)", "transparent"]}
                                start={{ x: 0, y: 0.7 }}
                                end={{ x: 0, y: 0 }}
                                style={styles.gradient}
                                />
                </View>
            </ImageBackground>
         </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({        background: {
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
          marginVertical:5,
        },
        overlayContainer: {
          bottom: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 20,
          alignItems: "center",
          padding:30,
        },
  });