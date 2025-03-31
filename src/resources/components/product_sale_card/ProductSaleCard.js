import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./ProductSaleCardStyle";

export function ProductSaleCard({ produto: product, adicionaCarrinho }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imagem }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.productTitle}>{product.descricao}</Text>
        <Text style={styles.productPrice}>R$ {product.preco}</Text>
        <Text style={styles.installmentPrice}>
          ou 10x de R$ {(product.preco / 10).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.buyButton}
          activeOpacity={0.8}
          onPress={() => adicionaCarrinho(product)}
        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
