import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.secondaryColor,
        marginBottom: 8,
    },
    orderDate: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    orderAddress: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    orderItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.secondaryColor,
        marginTop: 8,
    },
    itemContainer: {
        marginTop: 4,
        padding: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    itemDescription: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 2,
    },
});

export default styles;