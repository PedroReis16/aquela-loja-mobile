import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./HomeScreenStyle";
// import { HomeBanner } from "../../components/home_banner/HomeBanner";
import { ImageCarousel } from "../../components/home_banner/HomeBanner";
import { useEffect, useState } from "react";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import ProductSaleCard from "../../components/product_sale_card/ProductSaleCard"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {

  const chaveCarrinho = "carrinho";
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    iniciaPagina();
  }, []);

  async function iniciaPagina() {
    await ProdutoDao.createTable();
    await carregaProdutos();
  }

  async function carregaProdutos() {
    try {
      let produtos = await ProdutoDao.findAllProdutos();
      setProdutos(produtos);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os produtos");
      console.log(e);
    }
  }

  async function adicionaCarrinho(produto) {
    try {
      // Carrega o carrinho atual diretamente do AsyncStorage para garantir que está atualizado
      let objString = await AsyncStorage.getItem(chaveCarrinho);
      let carrinhoAtual = objString ? JSON.parse(objString) : [];
  
      // Verifica se o produto já está no carrinho
      let index = carrinhoAtual.findIndex((item) => item.codigo == produto.codigo);
  
      if (index == -1) {
        // Cria o objeto do produto
        let obj = {
          codigo: produto.codigo,
          imagem: produto.imagem,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidade: 1,
        };
  
        // Adiciona o produto ao carrinho atual
        carrinhoAtual.push(obj);
  
        console.log('Adicionando no carrinho: ', obj);
  
        // Atualiza o estado e o AsyncStorage
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
  

  async function carregaCarrinho() {
    try {
      let objString = await AsyncStorage.getItem(chaveCarrinho);

      if (objString != null) {
        let obj = JSON.parse(objString);
        setCarrinho(obj);
      } else {
        setCarrinho([]);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar o carrinho');
    }
  }

  return (
    <ScrollView
      style={styles.productView}
      contentContainerStyle={{ flex: 1, gap: 10 }}
    >
      <View style={styles.container}>
        <ImageCarousel
          images={[
            // require("../../../../assets/banner_images/banner-one.jpg"),
            require("../../../../assets/banner_images/banner-two.jpg"),
            require("../../../../assets/banner_images/banner-four.jpg"),
            require("../../../../assets/banner_images/banner-five.jpg"),
          ]}
        />
      </View>

      <Text>Produtos!!!</Text>
      {produtos.map((produto, index) => (
        <ProductSaleCard produto={produto} adicionaCarrinho={() => adicionaCarrinho(produto)}  key={index}/>
      ))}
    </ScrollView>
  );
}
