import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import styles from './style';

export default function ProdutoCrud({navigation, route}) {
  return (
    <View style={styles.container}>
      <Text>Tela de produtos!</Text>
      <StatusBar style="auto" />
    </View>
  );
}