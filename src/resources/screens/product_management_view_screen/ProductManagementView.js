import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback } from "react";
import { findAllCategorias } from "../../../app/db/CategoriaDao";
import {
  createTable,
  findAllProdutos,
  excluirProduto,
} from "../../../app/db/ProdutoDao";
import { styles } from "./ProductManagementViewStyle";
import { Keyboard } from "react-native";
import { EditableProductCard } from "../../components/editable_product_card/EditableProductCard";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { COLORS as Colors } from "../../../app/models/Colors";

export default function ProductManagementViewScreen({ navigation, route }) {
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
    await createTable();
    await carregaProdutos();
    const categorias = await findAllCategorias();
    setTodasCategorias(categorias);
  }

  async function carregaProdutos() {
    try {
      let produtos = await findAllProdutos();
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

  async function deleteProduct(codigo) {
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
    await excluirProduto(codigo);
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
      {/* Categoria */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Categoria</Text>
        <View style={styles.inputContainer}>
          <Feather name={Icons.Widgets} size={20} color={Colors.gray} />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoria}
              onValueChange={(itemValue) => {
                setCategoria(itemValue);
                filtrarProdutosPorCategoria(itemValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Todas" value="" />
              {todasCategorias.map((cat) => (
                <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scvCards}>
        {produtosFiltrados.map((produto, index) => (
          <EditableProductCard
            produto={produto}
            excluirProduto={() => deleteProduct(produto.codigo)}
            editarProduto={() => editarProduto(produto)}
            key={index.toString()}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          novoProduto();
        }}
      >
        <Feather name={Icons.Add} size={32} color={Colors.white} />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
