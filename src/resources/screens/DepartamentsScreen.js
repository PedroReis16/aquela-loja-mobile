import { View, Text, StyleSheet } from "react-native";

export default function DepartamentsScreen() {
  return (
    <View style={styles.container}>
      <Text>Departaments</Text>
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
