import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./ProfileScreenStyle";

export default function ProfileScreen() {
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
