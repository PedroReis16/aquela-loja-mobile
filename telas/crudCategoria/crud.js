import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { useState } from 'react';
import CategoriaCard from './card';

export default function CategoriaCrud({ navigation, route }) {

    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [categorias, setCategorias] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.vwCampos}>
                <Text style={styles.campoText}>Nome</Text>
                <TextInput style={styles.txtCampo} onChangeText={(text) => setNome(text)} />
                <TouchableOpacity style={styles.btnCriar}>
                    <Text style={styles.btnText}>Criar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}