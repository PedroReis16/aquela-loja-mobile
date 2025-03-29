import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./SearchBarStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
