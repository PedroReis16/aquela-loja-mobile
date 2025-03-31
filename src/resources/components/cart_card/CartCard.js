import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./CartCardStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CartCard({
  produto,
  alteraQtd
}) {
  return (
    <View style={styles.productCard}>
      <View style={styles.vwImage}>
        <Image source={{ uri: produto.imagem }} style={styles.productImage} resizeMode="stretch" />
      </View>
  
      <View style={styles.row}>
        <View>
          <Text style={styles.productName}>{produto.descricao}</Text>
          <Text style={styles.productPrice}>R$ {produto.preco * produto.quantidade}</Text>
        </View>
        
        <TouchableOpacity onPress={() => alteraQtd(produto.codigo, '-')}>
          <FontAwesome5 name="minus-square" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.productPrice}> {produto.quantidade}</Text>
        <TouchableOpacity onPress={() => alteraQtd(produto.codigo, '+')}>
          <FontAwesome5 name="plus-square" size={24} color="black" />
        </TouchableOpacity>
        {console.log('produto:', produto)}
      </View>
    </View>
  );
}
