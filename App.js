import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./src/app/stacks/TabNavigator";

export default function App() {
  return (
    <NavigationContainer
    
    >
      <TabNavigator />
    </NavigationContainer>
  );
}
