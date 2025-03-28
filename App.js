import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./lib/resources/components/tab-bar";

import HomeScreen from "./lib/resources/pages/home_page";
import ProfileScreen from "./lib/resources/pages/profile_page";
import DepartamentsScreen from "./lib/resources/pages/departaments_page";
import FavoriteScreen from "./lib/resources/pages/favorite";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          animation: "fade",
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Departaments" component={DepartamentsScreen} />
        <Tab.Screen name= "Favorites" component={FavoriteScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
