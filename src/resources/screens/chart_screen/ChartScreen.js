import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import * as PedidoDao from "../../../app/db/PedidoDao";
import { COLORS } from "../../../app/models/Colors";
import styles from "./ChartScreenStyle";

export default function DashboardScreen() {
    const [produtos, setProdutos] = useState([]);
    const [pedidosPorDia, setPedidosPorDia] = useState([]);

    useEffect(() => {
        carregaDados();
    }, []);

    async function carregaDados() {
        try {
            const pedidos = await PedidoDao.findAllPedidos();

            const produtosMap = new Map();
            const pedidosMap = new Map();

            pedidos.forEach((pedido) => {
                pedido.itens.forEach((item) => {
                    if (produtosMap.has(item.descricao)) {
                        produtosMap.set(item.descricao, produtosMap.get(item.descricao) + item.quantidade);
                    } else {
                        produtosMap.set(item.descricao, item.quantidade);
                    }
                });

                const dataPedido = new Date(pedido.data).toLocaleDateString();
                if (pedidosMap.has(dataPedido)) {
                    pedidosMap.set(dataPedido, pedidosMap.get(dataPedido) + 1);
                } else {
                    pedidosMap.set(dataPedido, 1);
                }
            });

            const cores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56"];
            const produtosArray = Array.from(produtosMap, ([descricao, quantidade], index) => ({
                name: `${descricao} (${quantidade})`,
                quantidade,
                color: cores[index % cores.length],
                legendFontColor: "#333",
                legendFontSize: 15,
            }));

            const pedidosArray = Array.from(pedidosMap, ([data, quantidade]) => ({ data, quantidade }));

            setProdutos(produtosArray);
            setPedidosPorDia(pedidosArray);
        } catch (error) {
            console.error("Erro ao carregar dados: ", error);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard de vendas</Text>

                <Text style={styles.chartTitle}>Produtos Vendidos</Text>
                <PieChart
                    data={produtos.map((item) => ({ ...item, legendFontSize: 0 }))}
                    width={350}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#f0f0f0",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#f7f7f7",
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor={"quantidade"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
                <View style={styles.legendContainer}>
                    {produtos.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.chartTitle}>Pedidos por Dia</Text>
                <BarChart
                    data={{
                        labels: pedidosPorDia.map((item) => item.data),
                        datasets: [
                            {
                                data: pedidosPorDia.map((item) => item.quantidade),
                            },
                        ],
                    }}
                    width={350}
                    height={300}
                    fromZero
                    showBarTops={false}
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundGradientFrom: "#f5f5f5",
                        backgroundGradientTo: "#e0e0e0",
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        labelColor: () => "#333",
                        decimalPlaces: 0,
                    }}
                    verticalLabelRotation={30}
                    style={styles.chart}
                />
            </View>
        </ScrollView>
    );
}
