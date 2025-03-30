import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./src/resources/stacks/TabNavigator";
import { AuthProvider } from "./src/resources/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
