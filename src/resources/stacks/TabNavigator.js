import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../screens/categories_screen/CategoriesScreen";
import FavoriteScreen from "../../resources/screens/FavoriteScreen";
import ProfileScreen from "../screens/profile_screen/ProfileScreen";

import { TabBar } from "../../resources/components/tab_bar/TabBar";
import ProductNavigator from "./ProductNavigator";
import { SearchBar } from "../../resources/components/search_bar/SearchBar";

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{}}>
      <Tab.Screen
        name="Inicio"
        component={ProductNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoriesScreen}
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
