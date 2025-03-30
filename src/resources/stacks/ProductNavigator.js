import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../resources/screens/home_screen/HomeScreen";
import ProdutoCrud from "../../resources/screens/new_product_screen/NewProductScreen";
import ProdutoList from "../../resources/screens/new_product_screen/ProductListScreen";
import CategoriaCrud from "../screens/new_categories_screen/NewCategory";
import { SearchBar } from "../../resources/components/search_bar/SearchBar";
import ProfileScreen from "../screens/profile_screen/ProfileScreen";

const Stack = createNativeStackNavigator();

export default ProductNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "fade",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="CrudProduto"
        component={ProdutoCrud}
        options={{ headerBackVisible: true, title: "Cadastro de produto" }}
      />
      <Stack.Screen
        name="ProdutoList"
        component={ProdutoList}
        options={{ headerBackVisible: true, title: "Listagem de produto" }}
      />
      <Stack.Screen
        name="CrudCategoria"
        component={CategoriaCrud}
        options={{ headerBackVisible: true, title: "Cadastro de categoria" }}
      />
    </Stack.Navigator>
  );
};
