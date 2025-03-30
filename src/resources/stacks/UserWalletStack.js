import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS as Colors } from "../../app/models/Colors";
import WalletListScreen from "../screens/wallet_list_screen/WalletListScreen";
import CreditCardScreen from "../screens/new_card_screen/NewCardScreen";

const Stack = createNativeStackNavigator();

export default UserWalletStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserWallet"
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
        name="UserWallet"
        component={WalletListScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: "Carteira",
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="NewCard"
        component={CreditCardScreen}
        options={{
          headerBackVisible: true,
          headerTitle: "Adicionar cartão",
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
};
