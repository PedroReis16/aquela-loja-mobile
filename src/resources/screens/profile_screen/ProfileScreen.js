import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "./ProfileScreenStyle";
import { AuthContext } from "../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { ProfileCard } from "../../components/profile_card/ProfileCard";
import { ProfileWidgetCard } from "../../components/profile_widget_card/ProfileWidgetCard";
import { ICON_MAP as Icons } from "../../../app/models/Icons";

export default function ProfileScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <ProfileCard
          userName={user.role === "admin" ? "Administrador" : "Usuário"}
        />

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Feather name={Icons.Widgets} size={20} color="#00BCD4" />
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>

          <View style={styles.cardRow}>
            <ProfileWidgetCard
              icon={Icons.Wallet}
              title={"Carteira"}
              description={"Gerencie seus cartões"}
              onTap={() => navigation.navigate("UserWalletStack")}
            />
            <ProfileWidgetCard
              icon={Icons.Truck}
              title={"Meus Pedidos"}
              description={"Acompanhe todos os seus pedidos"}
              onTap={() => navigation.navigate("Pedidos")}
            />
            {user.role === "admin" && (
              <ProfileWidgetCard
                icon={Icons.Package}
                title={"Estoque"}
                description={
                  "Gerencie os produtos, categorias e visualize como andam suas vendas"
                }
                onTap={() => navigation.navigate("StorageDetails")}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
