import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DepartamentsScreen from "../../resources/screens/DepartamentsScreen";
import FavoriteScreen from "../../resources/screens/FavoriteScreen";
import ProfileScreen from "../../resources/screens/ProfileScreen";

import { TabBar } from "../../resources/components/tab_bar/TabBar";
import ProductNavigator from "./ProductNavigator";

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        animation: "fade",
        headerShown: false,
      }}
    >
      <Tab.Screen name="Inicio" component={ProductNavigator} />
      <Tab.Screen name="Departamentos" component={DepartamentsScreen} />
      <Tab.Screen name="Favoritos" component={FavoriteScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
