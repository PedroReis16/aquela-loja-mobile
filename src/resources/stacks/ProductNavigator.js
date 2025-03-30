import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProdutoCrud from "../../resources/screens/new_product_screen/NewProductScreen";
import CategoriaCrud from "../screens/new_categories_screen/NewCategory";
import ProfileScreen from "../screens/profile_screen/ProfileScreen";
import { COLORS as Colors } from "../../app/models/Colors";

const Stack = createNativeStackNavigator();

export default ProductNavigator = () => {
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
        name="CrudProduto"
        component={ProdutoCrud}
        options={{ headerBackVisible: true, title: "Cadastro de produto" }}
      />
      <Stack.Screen
        name="CrudCategoria"
        component={CategoriaCrud}
        options={{ headerBackVisible: true, title: "Cadastro de categoria" }}
      />
    </Stack.Navigator>
  );
};
