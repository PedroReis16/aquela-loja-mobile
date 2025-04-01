import { View, Text, ScrollView, Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import * as PedidoDao from "../../../app/db/PedidoDao";
import { styles } from "./OrderScreenStyle";
import { useFocusEffect } from "@react-navigation/native";

export default function OrderScreen({ navigation }) {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        iniciaPagina();
    }, []);

    useFocusEffect(
        useCallback(() => {
            iniciaPagina();
        }, [])
    );

    async function iniciaPagina() {
        await carregaPedidos();
    }

    async function carregaPedidos() {
        try {
            const pedidos = await PedidoDao.findAllPedidos();
            if (pedidos != null) {
                setPedidos(pedidos);
            } else {
                setPedidos([]);
            }
        } catch (e) {
            Alert.alert("Erro", "Não foi possível carregar os pedidos");
        }
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <ScrollView style={{ flex: 1 }}>
                {pedidos.map((pedido, index) => (
                    <View key={index} style={styles.orderItem}>
                        <Text style={styles.orderTitle}>Pedido: {pedido.codigo}</Text>
                        <Text style={styles.orderDate}>Data: {pedido.data}</Text>
                        <Text style={styles.orderAddress}>Endereço: {pedido.endereco}</Text>

                        <Text style={styles.orderItemTitle}>Itens do Pedido:</Text>
                        {pedido.itens.map((item, idx) => (
                            <View key={idx} style={styles.itemContainer}>
                                <Text style={styles.itemDescription}>{item.descricao}</Text>
                                <Text>Quantidade: {item.quantidade}</Text>
                                <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
                                <Text>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
