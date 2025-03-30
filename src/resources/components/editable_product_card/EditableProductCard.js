import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./EditableProductCardStyle";

export function EditableProductCard({ product }) {
  return (
    <View style={styles.productCard}>
      <Image
        source={product.imagem}
        style={styles.productImage}
        resizeMode="stretch"
      />
      <Text style={styles.productName}>{product.descricao}</Text>
      <Text style={styles.productPrice}>R$ {product.preco}</Text>
      <Text style={styles.productDescription}>{product.categoria}</Text>
    </View>
  );
}
