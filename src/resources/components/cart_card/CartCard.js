import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./CartCardStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CartCard({
  produto,
  alteraQtd
}) {
  return (
    <View style={styles.productCard}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: produto.imagem }} style={styles.image} resizeMode="stretch" />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{produto.descricao}</Text>
          <Text style={styles.productPrice}>R$ {(produto.preco * produto.quantidade).toFixed(2)}</Text>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => alteraQtd(produto.codigo, '-')}>
              <FontAwesome5 name="minus-square" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.productPrice}> {produto.quantidade}</Text>
            <TouchableOpacity onPress={() => alteraQtd(produto.codigo, '+')}>
              <FontAwesome5 name="plus-square" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
