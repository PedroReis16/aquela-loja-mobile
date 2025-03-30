import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { createTable, findAllCards } from "../../../app/db/CardDao";
import { AuthContext } from "../../context/AuthContext";
import { CreditCard } from "../../components/credit_card/CreditCard";
// import { styles } from "./WalletListScreenStyle";
// import { COLORS as Colors } from "../../../app/models/Colors";

export default function WalletListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    initScreen();
  }, []);

  async function initScreen() {
    try {
      await createTable();
      await getCards();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os cartões");
    }
  }

  async function getCards() {
    try {
      let result = await findAllCards(user.role);
      print(result);
      setCards(result);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os cartões");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CreditCard card={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewCard");
        }}
      >
        <Text>Adicionar cartão</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
  },
});
