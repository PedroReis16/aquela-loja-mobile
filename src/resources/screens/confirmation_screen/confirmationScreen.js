import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./confirmationScreenStyle";
import * as CartaoDao from "../../../app/db/CardDao";
import * as PedidoDao from "../../../app/db/PedidoDao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function ConfirmationScreen({ navigation, route }) {
    const chaveCarrinho = "carrinho";
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartoes, setCartoes] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [cartaoSelecionado, setCartaoSelecionado] = useState('');

    useEffect(() => {
        iniciaPagina();
    }, []);

    async function iniciaPagina() {
        await PedidoDao.createTables();
        console.log('iniciando tela');
        const cartoes = await CartaoDao.findAllCards({ userId: 1 });
        console.log(cartoes);
        setCartoes(cartoes);
        console.log(route.params.carrinho)
        setCarrinho(route.params.carrinho);

        const totalCarrinho = route.params.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        setTotal(totalCarrinho);
    }

    async function finalizarCompra() {
        try {
            const codigoPedido = uuid.v4();
            const dataAtual = new Date().toISOString().replace("T", " ").slice(0, 19);

            const pedido = {
                codigo: codigoPedido,
                endereco: endereco,
                data: dataAtual,
                itens: carrinho,
            };

            const sucesso = await PedidoDao.adicionaPedido(pedido);

            if (sucesso) {
                await AsyncStorage.removeItem(chaveCarrinho);
                Alert.alert("Sucesso", "Pedido finalizado com sucesso!");
                navigation.navigate("Home");
            } else {
                Alert.alert("Erro", "Não foi possível finalizar o pedido.");
            }
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            Alert.alert("Erro", "Ocorreu um erro ao finalizar o pedido.");
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {carrinho.map((produto, index) => (
                    <View key={index} style={styles.productItem}>
                        <Text style={styles.productTitle}>{produto.descricao}</Text>
                        <Text style={styles.productPrice}>R$ {produto.preco}</Text>
                        <Text style={styles.productQuantity}>Quantidade: {produto.quantidade}</Text>
                        <Text>Total: R$ {produto.preco * produto.quantidade}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.vwPicker}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Selecione um endereço:</Text>
                    <Picker
                        selectedValue={endereco}
                        onValueChange={(itemValue) => setEndereco(itemValue)}
                    >
                        <Picker.Item label="Endereço 1" value="endereco1" />
                        <Picker.Item label="Endereço 2" value="endereco2" />
                        <Picker.Item label="Endereço 3" value="endereco3" />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Selecione um cartão:</Text>
                    <Picker
                        selectedValue={cartaoSelecionado}
                        onValueChange={(itemValue) => setCartaoSelecionado(itemValue)}
                    >
                        {cartoes.map((cartao, index) => (
                            <Picker.Item
                                key={cartao.id}
                                label={`**** ${cartao.cardNumber.slice(-4)}`} // Exibe os últimos 4 dígitos
                                value={cartao.id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
                <Button title="Finalizar Compra" onPress={finalizarCompra} />
            </View>

        </View>
    );
}
