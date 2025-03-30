import { StatusBar } from 'expo-status-bar';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './NewCategoryStyle';
import { useEffect, useState } from 'react';
import CategoriaCard from '../../components/category_card/CategoryCard';
import * as Dao from '../../../app/db/CategoriaDao'

export default function CategoriaCrud({ navigation, route }) {

    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [categorias, setCategorias] = useState([]);

    useEffect(
        () => {
            iniciaPagina();
        }, []
    );

    async function iniciaPagina() {
        try {
            await Dao.createTable()
            await carregaCategorias();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as categorias');
        }
    }

    async function carregaCategorias() {
        try {
            let categorias = await Dao.findAllCategorias();
            setCategorias(categorias);
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível carregar as categorias');
            console.log(e);
        }
    }

    async function salvaCategoria() {
        if (nome === undefined) {
            Alert.alert('Incompleto', 'faltam dados para o cadastro');

            return;
        }

        const novo = (id == undefined);

        let obj = {
            id: novo ? createUniqueId() : id,
            nome: nome
        };

        try {
            if (novo) {
                let resposta = await Dao.adicionaCategoria(obj)

                if (resposta)
                    Alert.alert('Sucesso', 'Categoria criada');
                else
                    Alert.alert('Erro', 'Não foi possível inserir a categoria');
            } else {
                let resposta = await Dao.editaCategoria(obj);

                if (resposta)
                    Alert.alert('Sucesso', 'Categoria alterada');
                else
                    Alert.alert('Erro', 'Não foi possível alterar');
            }

            Keyboard.dismiss();
            limpaCampos();
            await carregaCategorias();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível inserir a categoria')
            console.log(error)
        }
    }

    function excluirCategoria(id, nome) {
        Alert.alert('Certeza?', `Deseja excluir a categoria ${nome}?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaDelecao(id),
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }

    function editaCategoria(id) {
        const categoria = categorias.find(cat => cat.id == id)

        if (categoria != undefined) {
            console.log(nome);
            setId(categoria.id);
            setNome(categoria.nome);
        }
    }

    async function efetivaDelecao(id) {
        await Dao.excluirCategoria(id);
        Keyboard.dismiss();
        limpaCampos();
        await carregaCategorias();
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    function limpaCampos() {
        setNome("");
        setId(undefined);
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwCampos}>
                <Text style={styles.campoText}>Nome</Text>
                <TextInput style={styles.txtCampo} onChangeText={(text) => setNome(text)} value={nome} />
                <TouchableOpacity style={styles.btnCriar} onPress={() => salvaCategoria()}>
                    <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scvCards}>
                {
                    categorias.map((categoria, index) => (
                        <CategoriaCard categoria={categoria} excluirCategoria={excluirCategoria} editarCategoria={editaCategoria}
                            key={index.toString()} />
                    ))
                }
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}