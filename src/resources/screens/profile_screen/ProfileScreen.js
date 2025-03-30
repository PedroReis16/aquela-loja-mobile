import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./ProfileScreenStyle";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.vwButtons}>
        <Text style={styles.titulo}>{user.role}</Text>

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
