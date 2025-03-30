import { View, Text, StyleSheet } from "react-native";
import { styles } from "./ProductListScreenStyle";

export default function ProductListScreen({ navigation, route }) {
  // Acesse os parâmetros usando route.params
  const { categoriaId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>Lista de produtos</Text>
      {categoriaId && <Text>Parâmetro recebido: {categoriaId}</Text>}
    </View>
  );
}
