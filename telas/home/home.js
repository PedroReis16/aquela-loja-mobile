import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./style";

export default function Home({ navigation, route }) {
    return (
        <View style={styles.vwButtons}>
            <Text style={styles.titulo}>Estou na home</Text>

            <View>
                <TouchableOpacity style={styles.btnNav} onPress={() => navigation.navigate('CrudProduto')}>
                    <Text>Produtos</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

