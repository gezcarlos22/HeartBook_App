import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const TextDetalles = () => {
  return (
    <View style={styles.containerDetalles}>
      <View style={[styles.detalle, styles.firstDetalle]}>
        <Text style={[styles.description, { fontSize: 14, color: "#666666" }]}>
          Page
        </Text>
        <Text style={styles.description}>416</Text>
      </View>
      <View style={styles.detalle}>
        <Text style={[styles.description, { fontSize: 14, color: "#666666" }]}>
          Year
        </Text>
        <Text style={styles.description}>2015</Text>
      </View>
      <View style={styles.detalle}>
        <Text style={[styles.description, { fontSize: 14, color: "#666666" }]}>
          Lang
        </Text>
        <Text style={styles.description}>ES</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerDetalles: {
    height: 50,
    width: "100%",
    borderRadius: 30,
    borderColor: "#666666",
    borderWidth: 1,
    flexDirection: "row",
    alignItems:"center",
    marginBottom:5,
  },
  detalle: {
    height:35,
    width: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#666666",
    borderLeftWidth: 1,
    //backgroundColor:"red"
  },
  firstDetalle: {
    borderLeftWidth: 0,
  },
  description: {
    fontSize: 16,
    color: "#dadada",
    fontWeight: "bold",
  },})