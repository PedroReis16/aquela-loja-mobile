import { View, Text, ScrollView } from "react-native";
import { styles } from "./HomeScreenStyle";
// import { HomeBanner } from "../../components/home_banner/HomeBanner";
import { ImageCarousel } from "../../components/home_banner/HomeBanner";
import { useEffect, useState } from "react";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import { ProductSaleCard } from "../../components/product_sale_card/ProductSaleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Carousel } from "../../components/products_carousel/ProductsCarousel";
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
        Alert.alert("Sucesso", "Item adicionado ao carrinho!");

        await carregaCarrinho();
      } else {
        Alert.alert("Lembrete", "Produto já está no carrinho");
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
      Alert.alert("Erro", "Não foi possível carregar o carrinho");
    }
  }
  const carouselItems = [
    {
      id: "1",
      title: "Produto 1",
      description:
        "Descrição do produto 1 com detalhes importantes e características",
      price: 299.99,
      imageUrl: "https://exemplo.com/imagem1.jpg",
    },
    {
      id: "2",
      title: "Produto 2",
      description: "Descrição do produto 2 com detalhes importantes",
      price: 199.5,
      imageUrl: "https://exemplo.com/imagem2.jpg",
    },
    {
      id: "3",
      title: "Produto 3",
      description: "Descrição do produto 3",
      price: 399.9,
      imageUrl: "https://exemplo.com/imagem3.jpg",
    },
  ];
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
      <Carousel items={produtos} onItemPress={adicionaCarrinho} />
      {/* <Text>Produtos!!!</Text>
      {produtos.map((produto, index) => (
        <ProductSaleCard
          produto={produto}
          adicionaCarrinho={() => adicionaCarrinho}
          key={index}
        />
      ))} */}
    </ScrollView>
  );
}
