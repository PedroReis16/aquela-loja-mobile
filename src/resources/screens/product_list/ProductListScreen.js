import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { styles } from "./ProductListScreenStyle";
import {
  findProductsByCategory,
  findProductsByName,
  findAllProdutos,
} from "../../../app/db/ProdutoDao";
import { ProductSaleCard } from "../../components/product_sale_card/ProductSaleCard";

export default function ProductListScreen({ navigation, route }) {
  const { categoriaId, productName } = route.params || {};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    initScreen();
  }, []);

  async function initScreen() {
    try {
      var products = [];

      if (categoriaId) {
        products = await findProductsByCategory(categoriaId);
      } else if (productName) {
        products = await findProductsByName(productName);
      } else {
        products = await findAllProdutos();
      }
      setProducts(products);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os produtos");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 8, alignItems: "center" }}
    >
      {products.map((product, index) => (
        <ProductSaleCard key={index} produto={product} />
      ))}
    </ScrollView>
  );
}
