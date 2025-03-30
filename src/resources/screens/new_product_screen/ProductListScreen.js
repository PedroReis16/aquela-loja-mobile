import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback } from "react";
import * as CategoriaDao from "../../../app/db/CategoriaDao";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
// import styles from './NewProductScreenStyle';
import { Keyboard } from "react-native";
import ProdutoCard from "../../components/product_card/ProductCard";
import { useFocusEffect } from "@react-navigation/native";

export default function ProdutoList({ navigation, route }) {
  const [categoria, setCategoria] = useState();
  const [todasCategorias, setTodasCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    iniciaPagina();
  }, []);

  useFocusEffect(
    useCallback(() => {
      iniciaPagina();
    }, [])
  );

  async function iniciaPagina() {
    await ProdutoDao.createTable();
    await carregaProdutos();
    const categorias = await CategoriaDao.findAllCategorias();
    setTodasCategorias(categorias);
  }

  async function carregaProdutos() {
    try {
      let produtos = await ProdutoDao.findAllProdutos();
      setProdutos(produtos);
      setProdutosFiltrados(produtos);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os produtos");
      console.log(e);
    }
  }

  async function filtrarProdutosPorCategoria(idCategoria) {
    if (idCategoria === "") {
      setProdutosFiltrados(produtos);
    } else {
      const produtosFiltrados = produtos.filter(
        (produto) => produto.categoria === idCategoria
      );
      setProdutosFiltrados(produtosFiltrados);
    }
  }

  async function excluirProduto(codigo) {
    Alert.alert("Certeza?", `Deseja excluir esse produto?`, [
      {
        text: "Sim",
        onPress: () => efetivaDelecao(codigo),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaDelecao(codigo) {
    await ProdutoDao.excluirCategoria(codigo);
    Keyboard.dismiss();
    Alert.alert("Sucesso", "Produto excluido");
    await carregaProdutos();
  }

  async function editarProduto(produto) {
    navigation.navigate("CrudProduto", { produtoParam: produto });
  }

  async function novoProduto() {
    navigation.navigate("CrudProduto");
  }

  return (
    <View style={styles.container}>
      <View style={styles.vwCampos}>
        <TouchableOpacity style={styles.btnCriar} onPress={() => novoProduto()}>
          <Text style={styles.btnText}>Novo Produto</Text>
        </TouchableOpacity>

        <Text style={styles.campoText}>Categoria</Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => {
            setCategoria(itemValue);
            filtrarProdutosPorCategoria(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Todas as categorias" value="" />
          {todasCategorias.map((cat) => (
            <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
          ))}
        </Picker>
      </View>
      <ScrollView style={styles.scvCards}>
        {produtosFiltrados.map((produto, index) => (
          <ProdutoCard
            produto={produto}
            excluirProduto={() => excluirProduto(produto.codigo)}
            editarProduto={() => editarProduto(produto)}
            key={index.toString()}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(247, 140, 0, 0.85)",
    alignItems: "center",
    justifyContent: "top-center",
  },
  txtCampo: {
    width: "100%",
    borderBlockColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 20,
    backgroundColor: "rgb(16, 0, 247)",
    color: "white",
  },
  vwCampos: {
    marginTop: 30,
    width: "70%",
  },
  btnCriar: {
    backgroundColor: "rgb(16, 0, 247)",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontSize: 25,
  },
  campoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scvCards: {
    marginTop: 40,
    width: "100%",
  },
  picker: {
    height: 50,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
});
