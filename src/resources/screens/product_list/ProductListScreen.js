import React, { useEffect, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { styles } from "./ProductListScreenStyle";
import {
  findProductsByCategory,
  findProductsByName,
  findAllProdutos,
} from "../../../app/db/ProdutoDao";
import { ProductSaleCard } from "../../components/product_sale_card/ProductSaleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductListScreen({ navigation, route }) {
  const chaveCarrinho = "carrinho";
  const { categoriaId, productName } = route.params || {};
  const [products, setProducts] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

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

  async function addOnCart(produto) {
    try {
      let objString = await AsyncStorage.getItem(chaveCarrinho);
      let carrinhoAtual = objString ? JSON.parse(objString) : [];
  
      let index = carrinhoAtual.findIndex((item) => item.codigo == produto.codigo);
  
      if (index == -1) {
        let obj = {
          codigo: produto.codigo,
          imagem: produto.imagem,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidade: 1,
        };
  
        carrinhoAtual.push(obj);
  
        console.log('Adicionando no carrinho: ', obj);
  
        setCarrinho(carrinhoAtual);
        await AsyncStorage.setItem(chaveCarrinho, JSON.stringify(carrinhoAtual));
        Alert.alert('Sucesso', "Item adicionado ao carrinho!");
      } else {
        Alert.alert('Lembrete', "Produto já está no carrinho");
      }
    } catch (e) {
      Alert.alert(e.toString());
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 8, alignItems: "center" }}
    >
      {products.map((product, index) => (
        <ProductSaleCard
          key={index}
          produto={product}
          adicionaCarrinho={addOnCart}
        />
      ))}
    </ScrollView>
  );
}
