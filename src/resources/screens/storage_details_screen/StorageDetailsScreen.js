import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./StorageDetailsStyle";
import { ProfileWidgetCard } from "../../components/profile_widget_card/ProfileWidgetCard";
import { ICON_MAP as Icons } from "../../../app/models/Icons";

export default function StorageDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={{ gap: 16 }}
      >
        <ProfileWidgetCard
          icon={Icons.Categorias}
          title={"Categorias"}
          description={"Gerencie as categorias disponíveis na loja"}
          onTap={() => navigation.navigate("CrudCategoria")}
        />
        <ProfileWidgetCard
          icon={Icons.Package}
          title={"Produtos"}
          description={"Gerencie os produtos disponíveis na loja"}
          onTap={() => navigation.navigate("ProductManagement")}
        />
        <ProfileWidgetCard
          icon={Icons.TrendingUp}
          title={"Resultados"}
          description={"Observe como andam suas vendas"}
        />
      </ScrollView>
    </View>
  );
}
