import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../resources/screens/home_screen/HomeScreen";
import ProdutoCrud from "../../resources/screens/new_product_screen/NewProductScreen";
import CategoriaCrud from "../../resources/screens/categories_screen/NewCategory";

const Stack = createNativeStackNavigator();

export default ProductNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "fade",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackVisible: false }}
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
