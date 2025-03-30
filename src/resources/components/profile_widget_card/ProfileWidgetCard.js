import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ProfileWidgetCardStyle";
import { Feather } from "@expo/vector-icons";
import { COLORS as Colors } from "../../../app/models/Colors";

export function ProfileWidgetCard({ icon, title, description, onTap }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onTap}>
      <View style={styles.cardTitleContainer}>
        <Feather name={icon} size={24} color={Colors.primaryColor} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
}
