import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./SearchBarStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { StatusBar } from "expo-status-bar";

export function SearchBar({ searchQuery, setSearchQuery, navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Carrinho")}>
          <Feather name={Icons.Cart} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
