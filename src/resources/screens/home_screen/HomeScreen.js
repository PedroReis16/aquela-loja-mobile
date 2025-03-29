import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreenStyle";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.vwButtons}>
        <Text style={styles.titulo}>Estou na home</Text>

        <View>
          <TouchableOpacity
            style={styles.btnNav}
            onPress={() => navigation.navigate("CrudProduto")}
          >
            <Text>Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNav}
            onPress={() => navigation.navigate("CrudCategoria")}
          >
            <Text>Categorias</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
