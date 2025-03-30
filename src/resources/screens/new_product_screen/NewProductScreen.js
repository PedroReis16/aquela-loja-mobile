import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import uuid from "react-native-uuid";
import { adicionaProduto, editarProduto } from "../../../app/db/ProdutoDao";
import { findAllCategorias } from "../../../app/db/CategoriaDao";
import { styles } from "./NewProductScreenStyle";

export default function ProdutoCrud({ navigation, route }) {
  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [todasCategorias, setTodasCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [imagemUri, setImagemUri] = useState(null);

  useEffect(() => {
    iniciaPagina();
  }, []);

  async function iniciaPagina() {
    const categorias = await findAllCategorias();
    setTodasCategorias(categorias);
    if (route.params.produtoParam != undefined) {
      const produto = route.params.produtoParam;
      setCodigo(produto.codigo);
      setDescricao(produto.descricao);
      setPreco(produto.preco ? String(produto.preco) : "");
      setCategoria(produto.categoria);
      setImagemUri(produto.imagem);
    } else {
      setCategoria(categorias[0].id);
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
    if (
      descricao === undefined ||
      preco === undefined ||
      categoria === undefined ||
      imagemUri === undefined
    ) {
      Alert.alert("Incompleto", "Faltam dados para o cadastro");
      return;
    }

    const novo = codigo === undefined;
    var teste = novo ? uuid.v4() : codigo;

    let obj = {
      codigo: teste,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
      imagem: imagemUri,
    };
    try {
      if (novo) {
        console.log("adicionar");
        let resposta = await adicionaProduto(obj);

        if (resposta) Alert.alert("Sucesso", "Produto criado");
        else Alert.alert("Erro", "Não foi possível inserir o produto");
      } else {
        console.log("editar");
        let resposta = await editarProduto(obj);

        if (resposta) Alert.alert("Sucesso", "Produto alterado");
        else Alert.alert("Erro", "Não foi possível alterar");
      }

      Keyboard.dismiss();
      limpaCampos();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o produto");
      console.log(error);
    }
  }

  async function limpaCampos() {
    setCodigo(undefined);
    setDescricao("");
    setPreco("");
    setCategoria("");
    setImagemUri(null);
  }

  const handleCancel = () => {
    limpaCampos();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
          {/* Descrição do produto */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descrição do produto</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#999"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite a descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
            </View>
          </View>

          {/* Categoria */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Categoria</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="grid-outline"
                size={20}
                color="#999"
                style={styles.icon}
              />
              <View style={styles.pickerContainer}>
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
              </View>
            </View>
          </View>

          {/* Preço */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Preço</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color="#999"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="0,00"
                keyboardType="decimal-pad"
                value={preco ? preco.toString() : ""}
                onChangeText={setPreco}
              />
            </View>
          </View>

          {/* Seletor de imagem */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Imagem do produto</Text>
            <TouchableOpacity
              style={styles.imageSelector}
              onPress={selecionarImagem}
            >
              <Ionicons name="image-outline" size={24} color="#999" />
              <Text style={styles.imageSelectorText}>
                {imagemUri ? "Trocar imagem" : "Escolher imagem"}
              </Text>
            </TouchableOpacity>

            {/* Preview da imagem */}
            {imagemUri && (
              <View style={styles.previewContainer}>
                <Image
                  source={{ uri: imagemUri }}
                  style={styles.imagePreview}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={limpaCampos}
          >
            <Text style={styles.deleteButtonText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={() => {
              salvaDados();
            }}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
