import { Text, TouchableOpacity, View } from "react-native";
import styles from "./CategoryCardStyle";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { COLORS as Colors } from "../../../app/models/Colors";

export default function CategoryCard({
  categoria,
  excluirCategoria,
  editarCategoria,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria.nome}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => editarCategoria(categoria.id)}>
          <Feather name={Icons.Edit} size={20} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => excluirCategoria(categoria.id, categoria.nome)}
        >
          <Feather name={Icons.Delete} size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
