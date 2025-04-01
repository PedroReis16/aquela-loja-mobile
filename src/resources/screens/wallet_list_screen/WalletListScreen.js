import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { createTable, findAllCards } from "../../../app/db/CardDao";
import { AuthContext } from "../../context/AuthContext";
import { CreditCard } from "../../components/credit_card/CreditCard";
import { styles } from "./WalletListScreenStyle";
import { Feather } from "@expo/vector-icons";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { COLORS as Colors } from "../../../app/models/Colors";
import { useFocusEffect } from "@react-navigation/native";

export default function WalletListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    initScreen();
  }, []);

  useFocusEffect(
    useCallback(() => {
      initScreen();
    }, [])
  );

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
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("NewCard");
        }}
      >
        <Feather name={Icons.Add} size={32} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
