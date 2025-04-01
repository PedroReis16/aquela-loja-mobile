import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../screens/categories_screen/CategoriesScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

import { TabBar } from "../components/tab_bar/TabBar";
import ProfileNavigator from "./ProfileStack";
import { SearchBar } from "../components/search_bar/SearchBar";
import HomeScreen from "../screens/home_screen/HomeScreen";
import { COLORS as Colors } from "../../app/models/Colors";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/login_screen/LoginScreen";
import BuyProductStack from "./BuyProductStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{}}>
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{ headerShown: false, headerBackVisible: false }}
      />
      <Tab.Screen
        name="Categorias"
        component={BuyProductStack}
        options={{ headerShown: false, headerBackVisible: false }}
      />
      {user ? (
        <>
          <Tab.Screen
            name="Perfil"
            component={ProfileNavigator}
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
