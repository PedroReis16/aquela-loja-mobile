import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DepartamentsScreen from "../../resources/screens/DepartamentsScreen";
import FavoriteScreen from "../../resources/screens/FavoriteScreen";
import ProfileScreen from "../../resources/screens/ProfileScreen";

import { TabBar } from "../../resources/components/tab_bar/TabBar";
import ProductNavigator from "./ProductNavigator";
import { SearchBar } from "../../resources/components/search_bar/SearchBar";

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={ProductNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Departamentos"
        component={DepartamentsScreen}
        options={{
          headerBackVisible: false,
          header: (props) => <SearchBar {...props} />,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
