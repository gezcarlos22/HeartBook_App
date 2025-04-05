import React from "react";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";

interface IconoProps {
  icon?: string;
  size?: number;
  color?: string;
  solid?: boolean;
}

export const Icono = ({
  icon,
  size,
  color = "white",
  solid = false
}: IconoProps) => {
  if (icon === "heart") {
    return solid ? (
      <FontAwesome name="heart" size={size} color={color} />
    ) : (
      <FontAwesome name="heart-o" size={size} color={color} />
    );
  }
  
  return (
    <FontAwesome6
      name={icon}
      size={size}
      color={color}
    />
  );
};


