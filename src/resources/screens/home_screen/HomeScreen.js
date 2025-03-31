import { View, Text, ScrollView } from "react-native";
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
      let index = carrinho.findIndex((item) => item.codigo == produto.codigo);

      if (index == -1) {
        let obj = {
          codigo: produto.codigo,
          imagem: produto.imagem,
          descricao: produto.descricao,
          preco: produto.preco,
        };
        carrinho.push(obj);

        let objString = JSON.stringify(lista);
        await AsyncStorage.setItem(chaveCarrinho, objString);
        Alert.alert('Sucesso', "Item adicionado ao carrinho!");

        await carregaCarrinho();
      }
      else {
        Alert.alert('Lembrete',"Produto já está no carrinho");
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
        setLista([]);
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
        <ProductSaleCard produto={produto} adicionaCarrinho={() => adicionaCarrinho}  key={index}/>
      ))}
    </ScrollView>
  );
}
