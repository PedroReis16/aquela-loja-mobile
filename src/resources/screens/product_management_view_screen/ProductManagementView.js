import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { findAllCategorias } from "../../../app/db/CategoriaDao";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import styles from "./ProductManagementViewStyle";
import { Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { COLORS as Colors } from "../../../app/models/Colors";
import { EditableProductCard } from "../../components/editable_product_card/EditableProductCard";

export default function ProductManagementViewScreen({ navigation }) {
  const [categoria, setCategoria] = useState();
  const [todasCategorias, setTodasCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    iniciaPagina();
  }, []);

  async function iniciaPagina() {
    await ProdutoDao.createTable();
    await carregaProdutos();
    const categorias = await findAllCategorias();
    setTodasCategorias(categorias);
  }

  async function carregaProdutos() {
    try {
      let produtos = await ProdutoDao.findAllProdutos();
      console.log(produtos);

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
    limpaCampos();
    await carregaProdutos();
  }

  async function editarProduto(codigo) {
    navigation.navigate("CrudProduto", { codigoParam: codigo });
  }

  async function novoProduto() {
    navigation.navigate("CrudProduto");
  }

  return (
    <View style={styles.container}>
      <View style={styles.vwCampos}>
        {/* <Text style={styles.campoText}>Categoria</Text> */}
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

        <ScrollView
          style={styles.productView}
          contentContainerStyle={{ flex: 1, gap: 10 }}
        >
          {produtosFiltrados.map((produto, index) => (
            <EditableProductCard product={produto} />
            // <ProdutoCard
            //   produto={produto}
            //   excluirProduto={() => excluirProduto(produto.codigo)}
            //   editarProduto={() => editarProduto(produto.codigo)}
            //   key={index.toString()}
            // />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => novoProduto()}>
        <Feather name={Icons.Add} size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}
