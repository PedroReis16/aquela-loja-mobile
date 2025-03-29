import { StyleSheet, Text, View } from "react-native";

import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CategoriaCard({ categoria, excluirCategoria, editarCategoria }) {
    return (
        <View style={styles.container}>
            <Text style={styles.nome}>{categoria.nome}</Text>
            <View style={styles.icone}>
                <EvilIcons name="trash" size={45} color="black" onPress={() => excluirCategoria(categoria.id, categoria.nome)} />
                <EvilIcons name="pencil" size={45} color="black" onPress={() => editarCategoria(categoria.id)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: 2,
        width: '100%',
        paddingHorizontal: 10,
    },
    nome: {
        fontSize: 25,
        marginLeft: 4,
        alignSelf: 'center',
        alignContent: 'center'
    },
    icone: {
        marginBottom: 5,
        alignSelf: 'center'
    }
});