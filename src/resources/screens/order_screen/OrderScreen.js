import { View, Text, ScrollView, Alert, Button } from "react-native";
import { useEffect, useState, useCallback } from "react";
import * as PedidoDao from "../../../app/db/PedidoDao";
import CartCard from "../../components/cart_card/CartCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./cartScreenStyle";
import { useFocusEffect } from "@react-navigation/native";

export default function CartScreen({ navigation }) {
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        iniciaPagina();
    }, []);

    useFocusEffect(
        useCallback(() => {
            iniciaPagina();
        }, [])
    );

    async function iniciaPagina() {
        await carregaCarrinho();
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
