import { Text, View } from "react-native";
import { styles } from "./CategoryCardStyle";

import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function CategoriaCard({ categoria, excluirCategoria }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{categoria.nome}</Text>
      <View style={styles.icone}>
        <EvilIcons
          name="trash"
          size={45}
          color="black"
          onPress={() => excluirCategoria(categoria.id.categoria.nome)}
        />
      </View>
    </View>
  );
}
