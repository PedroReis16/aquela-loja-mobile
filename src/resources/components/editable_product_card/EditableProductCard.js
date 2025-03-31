import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./EditableProductCardStyle";

export function EditableProductCard({
  produto: product,
  excluirProduto,
  editarProduto,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.imagem }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.descricao}</Text>
        <Text style={styles.category}>{product.categoriaNome}</Text>
        <Text style={styles.price}>{product.preco}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editarProduto(product)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => excluirProduto(product.codigo)}
        >
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
