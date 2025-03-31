import { View, Text, ScrollView, Alert, Button } from "react-native";
import { useEffect, useState, useCallback } from "react";
import * as ProdutoDao from "../../../app/db/ProdutoDao";
import CartCard from "../../components/cart_card/CartCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./cartScreenStyle";
import { useFocusEffect } from "@react-navigation/native";

export default function CartScreen({ navigation }) {
    const chaveCarrinho = "carrinho";
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        iniciaPagina();
    }, []);

    useEffect(() => {
        calculaTotal();
    }, [carrinho]);

    useFocusEffect(
        useCallback(() => {
            iniciaPagina();
        }, [])
    );

    async function iniciaPagina() {
        await carregaCarrinho();
    }

    async function alteraQtd(codigo, sinal) {
        try {
            const novoCarrinho = [...carrinho];
            const index = novoCarrinho.findIndex((item) => item.codigo === codigo);

            if (index !== -1) {
                if (sinal === "+") {
                    novoCarrinho[index].quantidade += 1;
                } else if (sinal === "-" && novoCarrinho[index].quantidade > 1) {
                    novoCarrinho[index].quantidade -= 1;
                } else if (sinal === "-" && novoCarrinho[index].quantidade === 1) {
                    Alert.alert(
                        "Remover produto",
                        "Deseja realmente remover este item do carrinho?",
                        [
                            { text: "Cancelar", style: "cancel" },
                            {
                                text: "Remover",
                                style: "destructive",
                                onPress: async () => {
                                    novoCarrinho.splice(index, 1);
                                    setCarrinho(novoCarrinho);
                                    await AsyncStorage.setItem(chaveCarrinho, JSON.stringify(novoCarrinho));
                                    console.log("Produto removido do carrinho:", codigo);
                                },
                            },
                        ]
                    );
                    return;
                }

                setCarrinho(novoCarrinho);
                await AsyncStorage.setItem(chaveCarrinho, JSON.stringify(novoCarrinho));
                console.log("Carrinho atualizado:", novoCarrinho);
            }
        } catch (e) {
            Alert.alert("Erro", "Não foi possível atualizar a quantidade");
            console.log(e);
        }
    }

    async function carregaCarrinho() {
        try {
            let objString = await AsyncStorage.getItem(chaveCarrinho);
            if (objString != null) {
                let obj = JSON.parse(objString);
                setCarrinho(obj);
            } else {
                setCarrinho([]);
            }
        } catch (e) {
            Alert.alert("Erro", "Não foi possível carregar o carrinho");
        }
    }

    function calculaTotal() {
        let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        setTotal(total);
    }

    function finalizarCompra() {
        navigation.navigate("Confirmacao", { carrinho: carrinho})
        // setCarrinho([]);
        // AsyncStorage.removeItem(chaveCarrinho);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, marginBottom: 70 }}
                contentContainerStyle={styles.centeredContent}
            >
                {carrinho.map((produto, index) => (
                    <CartCard produto={produto} alteraQtd={alteraQtd} key={index} />
                ))}
            </ScrollView>


            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
                <Button title="Finalizar Compra" onPress={finalizarCompra} />
            </View>
        </View>
    );
}
