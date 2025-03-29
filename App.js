import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./src/resources/stacks/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
