import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import {TabBar} from './lib/resources/components/tab-bar';

// import HomeScreen from './lib/resources/pages/home_page';
// import ProfileScreen from './lib/resources/pages/profile_page';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Inicial</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          animation: 'fade',
          headerShown: false
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { View, Text, StyleSheet } from 'react-native';

// import { HomeScreen } from './lib/resources/pages/home_page';
// import { ProfileScreen } from './lib/resources/pages/profile_page';

// // Criar o navegador de abas
// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             // Definir ícones para cada tab
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'settings' : 'settings-outline';
//             }

//             // Renderizar ícone
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'blue',
//           tabBarInactiveTintColor: 'gray',
//           headerShown: false, // Esconder cabeçalho padrão
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }