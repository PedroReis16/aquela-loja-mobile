import { StyleSheet, Text, View } from "react-native";

import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CategoriaCard({categoria, excluirCategoria}) {
    return(
        <View style={container}>
            <Text style={styles.nome}>{categoria.nome}</Text>
            <EvilIcons name="trash" size={24} color="black" onPress={() => excluirCategoria(categoria.id)}/>
        </View>
    );     
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 2
    },
    nome: {
        fontSize: 20
    }
});