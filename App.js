import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./src/app/stacks/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={(props) => <TabBar {...props} />}
//         screenOptions={{
//           animation: "fade",
//           headerShown: false,
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Departaments" component={DepartamentsScreen} />
//         <Tab.Screen name="Favorites" component={FavoriteScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProdutoCrud from "./telas/crudProduto/crud";
// import Home from "./telas/home/home";
// import CategoriaCrud from "./telas/crudCategoria/crud";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false, }}/>
//         <Stack.Screen name="CrudProduto" component={ProdutoCrud} options={{ headerBackVisible: true, title: 'Cadastro de produto' }}/>
//         <Stack.Screen name="CrudCategoria" component={CategoriaCrud} options={{ headerBackVisible: true, title: 'Cadastro de categoria' }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
