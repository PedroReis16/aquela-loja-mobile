import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./lib/resources/components/TabBar";

import HomeScreen from "./lib/resources/screens/HomeScreen";
import ProfileScreen from "./lib/resources/screens/ProfileScreen";
import DepartamentsScreen from "./lib/resources/screens/DepartamentsScreen";
import FavoriteScreen from "./lib/resources/screens/FavoriteScreen";

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
