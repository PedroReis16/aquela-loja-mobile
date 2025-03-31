import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS as Colors } from "../../app/models/Colors";
import CategoriesScreen from "../screens/categories_screen/CategoriesScreen";
import ProductListScreen from "../screens/product_list/ProductListScreen";
import CartScreen from "../screens/cart_screen/cartScreen"
import { SearchBar } from "../components/search_bar/SearchBar";

const Stack = createNativeStackNavigator();

export default BuyProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProductCategories">
      <Stack.Screen
        name="ProductCategories"
        component={CategoriesScreen}
        options={{
          headerBackVisible: false,
          header: (props) => <SearchBar {...props} />,
        }}
      />
      <Stack.Screen
        name="Produtos"
        component={ProductListScreen}
        options={{
          headerBackVisible: true,
          headerTitle: "Lista de produtos",
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Carrinho"
        component={CartScreen}
        options={{
          headerBackVisible: true,
          headerTitle: "Carrinho",
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};
