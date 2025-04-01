import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS as Colors } from "../../app/models/Colors";
import CartScreen from "../screens/cart_screen/cartScreen";
import ConfirmationScreen from "../screens/confirmation_screen/confirmationScreen";
import { SearchBar } from "../components/search_bar/SearchBar";
import HomeScreen from "../screens/home_screen/HomeScreen";

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          header: (props) => <SearchBar {...props} />,
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
      <Stack.Screen
        name="Confirmacao"
        component={ConfirmationScreen}
        options={{
          headerBackVisible: true,
          headerTitle: "Confirmação",
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};
