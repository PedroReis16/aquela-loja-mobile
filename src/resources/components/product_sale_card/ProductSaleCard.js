import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./ProductSaleCardStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ProductSaleCard({
  produto,
  adicionaCarrinho
}) {
  return (
    <View style={styles.productCard}>
      <View style={styles.vwImage}>
        <Image source={{ uri: produto.imagem }} style={styles.productImage} resizeMode="stretch" />
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.productName}>{produto.descricao}</Text>
          <Text style={styles.productPrice}>R$ {produto.preco}</Text>
        </View>
        <TouchableOpacity onPress={adicionaCarrinho(produto)}>
          <FontAwesome5 name="cart-plus" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
