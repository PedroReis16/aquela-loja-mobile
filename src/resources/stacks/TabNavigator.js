import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../screens/categories_screen/CategoriesScreen";
import FavoriteScreen from "../../resources/screens/FavoriteScreen";

import { TabBar } from "../../resources/components/tab_bar/TabBar";
import ProductNavigator from "./ProductNavigator";
import { SearchBar } from "../../resources/components/search_bar/SearchBar";
import HomeScreen from "../screens/home_screen/HomeScreen";
import { COLORS as Colors } from "../../app/models/Colors";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/login_screen/LoginScreen";

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{}}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          header: (props) => <SearchBar {...props} />,
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
          headerShown: true,
          headerTitle: "Favoritos",
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: Colors.black,
          },
          headerTintColor: Colors.white,
        }}
      />
      {user ? (
        <>
          <Tab.Screen
            name="Perfil"
            component={ProductNavigator}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Perfil"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
