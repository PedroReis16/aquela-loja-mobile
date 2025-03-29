import { View, Text } from "react-native";
import { styles } from "./HomeScreenStyle";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
}
