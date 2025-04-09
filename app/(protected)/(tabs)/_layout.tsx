import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image } from "react-native";

export default function TabLayout() {
  interface tabBarIconProps {
    color: string;
    focused: boolean;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AC0505",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgb(0, 0, 0)",
          borderRadius: 40,
          width: "90%",
          paddingHorizontal: 20,
          marginHorizontal: 20,
          marginVertical: 5,
          height: 50,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }: tabBarIconProps) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="editBook"
        options={{
            title: "Subir",
          tabBarIcon: ({ color, focused }: tabBarIconProps) => (
            <Image
            source={
                focused
                  ? require('@/assets/images/logo-gris.png')
                  : require('@/assets/images/icon.png')
              }
              style={{
                width: 50, // Ajusta el ancho de la imagen
                height: 50, // Ajusta la altura de la imagen
                marginBottom:25,
                backgroundColor: focused ? "#AC0505" : "#aaaaaa",
                borderRadius:30,
            }}
              resizeMode="contain" // Asegura que la imagen se ajuste dentro del contenedor
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }: tabBarIconProps) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});