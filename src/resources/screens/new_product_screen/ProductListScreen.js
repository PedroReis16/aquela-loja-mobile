import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import * as CategoriaDao from "../../../app/db/CategoriaDao";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import styles from './NewProductScreenStyle';
import { Keyboard } from "react-native";
import ProdutoCard from '../../components/product_card/ProductCard';

export default function ProdutoList({ navigation, route }) {
    const [categoria, setCategoria] = useState();
    const [todasCategorias, setTodasCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        iniciaPagina();
    }, []);

    async function iniciaPagina() {
        await ProdutoDao.createTable();
        await carregaProdutos();
        const categorias = await CategoriaDao.findAllCategorias();
        setTodasCategorias(categorias);
    }

    async function carregaProdutos() {
        try {
            let produtos = await ProdutoDao.findAllProdutos();
            setProdutos(produtos);
            setProdutosFiltrados(produtos);
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível carregar os produtos');
            console.log(e);
        }
    }

    async function filtrarProdutosPorCategoria(idCategoria) {
        if (idCategoria === "") {
            setProdutosFiltrados(produtos);
        } else {
            const produtosFiltrados = produtos.filter(produto => produto.categoria === idCategoria);
            setProdutosFiltrados(produtosFiltrados);
        }
    }

    async function excluirProduto(codigo) {
        Alert.alert('Certeza?', `Deseja excluir esse produto?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaDelecao(codigo),
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }

    async function efetivaDelecao(codigo) {
        await ProdutoDao.excluirCategoria(codigo);
        Keyboard.dismiss();
        limpaCampos();
        await carregaProdutos();
    }

    async function editarProduto(codigo) {
        navigation.navigate('CrudProduto', { codigoParam: codigo })
    }

    async function novoProduto() {
        navigation.navigate('CrudProduto')
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwCampos}>
                <TouchableOpacity style={styles.btnCriar} onPress={() => novoProduto()}>
                    <Text style={styles.btnText}>Novo Produto</Text>
                </TouchableOpacity>

                <Text style={styles.campoText}>Categoria</Text>
                <Picker
                    selectedValue={categoria}
                    onValueChange={(itemValue) => {
                        setCategoria(itemValue);
                        filtrarProdutosPorCategoria(itemValue);
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Todas as categorias" value="" />
                    {todasCategorias.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                <ScrollView style={styles.scvCards}>
                    {produtosFiltrados.map((produto, index) => (
                        <ProdutoCard
                            produto={produto}
                            excluirProduto={() => excluirProduto(produto.codigo)}
                            editarProduto={() => editarProduto(produto.codigo)}
                            key={index.toString()}
                        />
                    ))}
                </ScrollView>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
