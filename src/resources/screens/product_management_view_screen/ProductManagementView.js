import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { styles } from "./ProductManagementViewStyle";
import { EditableProductCard } from "../../components/editable_product_card/EditableProductCard";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";

export default function ProductManagementViewScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregaProdutos();
  }, []);

  async function carregaProdutos() {
    try {
      let produtos = await ProdutoDao.findAllProdutos();
      setProdutos(produtos);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os produtos");
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={{ gap: 16 }}
      >
        {produtos &&
          produtos.map((product, index) => (
            <EditableProductCard product={product} imagem={product.imagem} />
          ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.newProductButton}
        onPress={() => navigation.navigate("CrudProduto")}
      >
        <Feather name={Icons.Add} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
