import { Image, Text, View } from "react-native";
import styles from "./ProductCardStyle";

import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function ProductCardCard({
  produto,
  excluirProduto,
  editarProduto,
}) {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: produto.imagem }} style={styles.imagem} /> */}
      <Text style={styles.nome}>{produto.descricao}</Text>
      <Text style={styles.nome}>{produto.preco}</Text>
      <View style={styles.icone}>
        <EvilIcons
          name="trash"
          size={45}
          color="black"
          onPress={() => excluirProduto(produto.codigo)}
        />
        <EvilIcons
          name="pencil"
          size={45}
          color="black"
          onPress={() => editarProduto(produto.codigo)}
        />
      </View>
    </View>
  );
}
