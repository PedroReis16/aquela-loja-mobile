import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./CategoriesScreenStyle";
import * as Dao from "../../../app/db/CategoriaDao";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";

export default function CategoriesScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {categorias &&
          categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              onPress={() =>
                navigation.navigate("Produtos", { categoriaId: categoria.id })
              }
            >
              <View style={styles.categoryContainer}>
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryTitle}>{categoria.nome}</Text>
                  <Feather
                    name={Icons.Arrow_Right}
                    size={20}
                    color="black"
                    style={styles.categoryIcon}
                  />
                </View>
                <View style={styles.categoryDivider} />
              </View>
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Produtos")
          }
        >
          <View style={styles.categoryContainer}>
            <View style={styles.categoryTitleContainer}>
              <Text style={styles.categoryTitle}>Ver tudo</Text>
              <Feather
                name={Icons.Arrow_Right}
                size={20}
                color="black"
                style={styles.categoryIcon}
              />
            </View>
            <View style={styles.categoryDivider} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
