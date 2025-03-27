import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// Importar telas
// import HomeScreen from './screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import SettingsScreen from './screens/SettingsScreen';

// Criar o navegador de abas
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Definir ícones para cada tab
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Renderizar ícone
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Esconder cabeçalho padrão
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// // Exemplo de tela (HomeScreen.js)
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela Inicial</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default HomeScreen;