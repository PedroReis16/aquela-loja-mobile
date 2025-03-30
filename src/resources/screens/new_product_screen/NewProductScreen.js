import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as CategoriaDao from "../../../app/db/CategoriaDao";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import styles from './NewProductScreenStyle';
import uuid from 'react-native-uuid';
import { Keyboard } from "react-native";

export default function ProdutoCrud({ navigation, route }) {
  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState();
  const [preco, setPreco] = useState();
  const [categoria, setCategoria] = useState();
  const [todasCategorias, setTodasCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [imagemUri, setImagemUri] = useState(null);

  useEffect(() => {
    iniciaPagina();
  }, []);

  async function iniciaPagina() {
    const categorias = await CategoriaDao.findAllCategorias();
    setTodasCategorias(categorias);
    if (route.params.produtoParam != undefined) {
      const produto = route.params.produtoParam;
      setCodigo(produto.codigo);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setCategoria(produto.categoria)
      setImagemUri(produto.imagem)
    }
  }

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  async function salvaDados() {
    if (descricao === undefined || preco === undefined || categoria === undefined || imagemUri === undefined) {
      Alert.alert('Incompleto', 'faltam dados para o cadastro');

      return;
    }

    console.log('salvando')

    const novo = (codigo == undefined);
    let obj = {
      codigo: novo ? uuid.v4() : codigo,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
      imagem: imagemUri,
    };
    try {
      if (novo) {
        console.log(obj.codigo)
        let resposta = await ProdutoDao.adicionaProduto(obj)

        if (resposta)
          Alert.alert('Sucesso', 'Produto criado');
        else
          Alert.alert('Erro', 'Não foi possível inserir o produto');
      } else {
        console.log('editando produto')
        let resposta = await ProdutoDao.editarProduto(obj);

        if (resposta)
          Alert.alert('Sucesso', 'Produto alterada');
        else
          Alert.alert('Erro', 'Não foi possível alterar');
      }

      Keyboard.dismiss();
      limpaCampos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível inserir o produto')
      console.log(error)
    }
  }

  async function limpaCampos() {
    setCodigo(undefined);
    setDescricao("");
    setPreco(0);
    setCategoria(undefined);
    imagemUri(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.vwCampos}>
        <Text style={styles.campoText}>Descrição</Text>
        <TextInput
          style={styles.txtCampo}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.campoText}>Preço</Text>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.txtCampo}
          value={preco}
          onChangeText={setPreco}
        />

        <Text style={styles.campoText}>Categoria</Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {todasCategorias.map((cat) => (
            <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.btnCriar} onPress={selecionarImagem}>
          <Text style={styles.btnText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {imagemUri && (
          <Image source={{ uri: imagemUri }} style={styles.imagem} />
        )}

        <TouchableOpacity style={styles.btnCriar}>
          <Text style={styles.btnText} onPress={() => salvaDados()}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
