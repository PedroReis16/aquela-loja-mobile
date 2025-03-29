import { View, Text, StyleSheet } from "react-native";

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text>Favoritos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
