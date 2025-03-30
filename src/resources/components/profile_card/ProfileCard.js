import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./ProfileCardStyle";
import { Feather } from "@expo/vector-icons";
import { COLORS as Colors } from "../../../app/models/Colors";
import { AuthContext } from "../../context/AuthContext";

export function ProfileCard({ userName }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "../../../../assets/robo-avatar.png" }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.welcomeText}>Bem vindo, {userName}</Text>
          <View style={styles.adminBadge}>
            <Text style={styles.adminText}>{`${userName
              .replace("á", "a")
              .toLowerCase()}@email.com`}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
        }}
      >
        <Feather name="log-out" size={16} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
}
