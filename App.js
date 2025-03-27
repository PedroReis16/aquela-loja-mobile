import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProdutoCrud from "./telas/crudProduto/crud";
import Home from "./telas/home/home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false, }}/>
        <Stack.Screen name="CrudProduto" component={ProdutoCrud} options={{ headerBackVisible: true,  }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}