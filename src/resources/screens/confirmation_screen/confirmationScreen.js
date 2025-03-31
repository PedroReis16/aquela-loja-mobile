import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./confirmationScreenStyle";
import * as CartaoDao from "../../../app/db/CardDao";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConfirmationScreen({ navigation, route }) {
    const chaveCarrinho = "carrinho";
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartoes, setCartoes] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [cartaoSelecionado, setCartaoSelecionado] = useState('');

    useEffect(() => {
        console.log('iniciando');
        iniciaPagina();
    }, []);

    // Carregar os cartoes e carrinho
    async function iniciaPagina() {
        // const cartoes = await CartaoDao.findAllCards();
        // console.log(cartoes);
        // setCartoes(cartoes);
        console.log(route.params.carrinho)
        setCarrinho(route.params.carrinho);

        // Calcular o total
        const totalCarrinho = route.params.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        setTotal(totalCarrinho);
    }

    // Finalizar compra (limpa o carrinho no AsyncStorage)
    function finalizarCompra() {
        AsyncStorage.removeItem(chaveCarrinho);
        Alert.alert("Sucesso", "Pedido finalizado com sucesso!");
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {/* Lista de produtos do carrinho */}
            <ScrollView style={styles.productView}>
                {carrinho.map((produto, index) => (
                    <View key={index} style={styles.productItem}>
                        <Text>{produto.descricao}</Text>
                        <Text>R$ {produto.preco}</Text>
                        <Text>Quantidade: {produto.quantidade}</Text>
                        <Text>Total: R$ {produto.preco * produto.quantidade}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Picker para Endereço */}
            <View style={styles.pickerContainer}>
                <Text>Selecione um endereço:</Text>
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
                <Text>Selecione um cartão:</Text>
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

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
                <Button title="Finalizar Pedido" onPress={finalizarCompra} />
            </View>
        </View>
    );
}
