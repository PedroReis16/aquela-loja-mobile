import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProdutoCrud from "../screens/new_product_screen/NewProductScreen";
import CategoriaCrud from "../screens/category_management_screen/CategoryManagement";
import ProfileScreen from "../screens/profile_screen/ProfileScreen";
import ProdutoCrud from "../screens/new_product_screen/NewProductScreen";
import { COLORS as Colors } from "../../app/models/Colors";
import StorageDetailsScreen from "../screens/storage_details_screen/StorageDetailsScreen";
import ProductManagementViewScreen from "../screens/product_management_view_screen/ProductManagementView";
import UserWalletStack from "./UserWalletStack";
import OrderScreen from "../screens/order_screen/OrderScreen"

const Stack = createNativeStackNavigator();

export default ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animation: "fade",
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Minha conta",
        }}
      />
      <Stack.Screen
        name="UserWalletStack"
        component={UserWalletStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pedidos"
        component={OrderScreen}
        options={{
          headerTitle: "Pedidos",
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="StorageDetails"
        component={StorageDetailsScreen}
        options={{
          headerTitle: "Estoque",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="CrudCategoria"
        component={CategoriaCrud}
        options={{ headerBackVisible: true, title: "Gestão de categorias" }}
      />
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagementViewScreen}
        options={{ headerBackVisible: true, title: "Listagem de produto" }}
      />
      <Stack.Screen
        name="CrudProduto"
        component={ProdutoCrud}
        options={{ headerBackVisible: true, title: "Novo produto" }}
      />
    </Stack.Navigator>
  );
};
