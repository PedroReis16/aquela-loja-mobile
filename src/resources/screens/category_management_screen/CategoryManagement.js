import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./CategoryManagementStyle";
import { useEffect, useState } from "react";
import CategoryCard from "../../components/category_card/CategoryCard";
import * as Dao from "../../../app/db/CategoriaDao";
import { Feather } from "@expo/vector-icons";
import { COLORS as Colors } from "../../../app/models/Colors";
import { ICON_MAP as Icons } from "../../../app/models/Icons";

export default function CategoryManagement({ navigation, route }) {
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    iniciaPagina();
  }, []);

  async function iniciaPagina() {
    try {
      await Dao.createTable();
      await carregaCategorias();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    }
  }

  async function carregaCategorias() {
    try {
      let categorias = await Dao.findAllCategorias();
      setCategorias(categorias);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar as categorias");
      console.log(e);
    }
  }

  async function salvaCategoria() {

    console.log('salvando: ', nome)
    if(nome === undefined || nome === "") {
      Alert.alert("Erro!", "Digite o nome da categoria");
      return;
    }

    const novo = id == undefined;

    let obj = {
      id: novo ? createUniqueId() : id,
      nome: nome,
    };

    console.log(novo);
    try {
      if (novo) {
        let resposta = await Dao.adicionaCategoria(obj);

        if (resposta) Alert.alert("Sucesso", "Categoria criada");
        else Alert.alert("Erro", "Não foi possível inserir a categoria");
      } else {
        let resposta = await Dao.editaCategoria(obj);

        if (resposta) Alert.alert("Sucesso", "Categoria alterada");
        else Alert.alert("Erro", "Não foi possível alterar");
      }

      Keyboard.dismiss();
      limpaCampos();
      await carregaCategorias();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível inserir a categoria");
      console.log(error);
    }
  }

  function excluirCategoria(id, nome) {
    Alert.alert("Certeza?", `Deseja excluir a categoria ${nome}?`, [
      {
        text: "Sim",
        onPress: () => efetivaDelecao(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function editaCategoria(id) {
    console.log(id);

    const categoria = categorias.find((cat) => cat.id == id);

    if (categoria != undefined) {
      console.log(nome);
      setId(categoria.id);
      setNome(categoria.nome);
    }
  }

  async function efetivaDelecao(id) {
    await Dao.excluirCategoria(id);
    Keyboard.dismiss();
    limpaCampos();
    await carregaCategorias();
  }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  function limpaCampos() {
    setNome("");
    setId(undefined);
  }

  return (
    <View style={styles.container}>
      <View style={styles.newCategoryContainer}>
        <TextInput
          style={styles.categoryInput}
          placeholder="Nova categoria"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <TouchableOpacity
          style={styles.saveCategoryButton}
          onPress={() => salvaCategoria()}
        >
          <Feather name={Icons.Save} size={32} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryTitleContainer}>
        <Feather name={Icons.Widgets} size={24} color={Colors.primaryColor} />
        <Text style={styles.categoryTitle}>Categorias</Text>
      </View>
      <ScrollView
        style={styles.scvCards}
        contentContainerStyle={{ flexGrow: 1, gap: 8 }}
      >
        {categorias.map((categoria, index) => (
          <CategoryCard
            categoria={categoria}
            excluirCategoria={excluirCategoria}
            editarCategoria={editaCategoria}
            key={index.toString()}
          />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
