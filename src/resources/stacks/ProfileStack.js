import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProdutoCrud from "../screens/new_product_screen/NewProductScreen";
import CategoriaCrud from "../screens/new_categories_screen/CategoryManagement";
import ProfileScreen from "../screens/profile_screen/ProfileScreen";
import { COLORS as Colors } from "../../app/models/Colors";
import StorageDetailsScreen from "../screens/storage_details_screen/StorageDetailsScreen";

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
      {/* <Stack.Screen
        name="CrudProduto"
        component={ProdutoCrud}
        options={{ headerBackVisible: true, title: "Cadastro de produto" }}
      />*/}
    </Stack.Navigator>
  );
};
