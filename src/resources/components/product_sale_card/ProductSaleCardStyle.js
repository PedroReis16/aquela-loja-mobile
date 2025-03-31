import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    backgroundColor: 'rgb(255, 123, 0)'
  },
  productImage: {
    width: "95%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  productPrice: {
    fontSize: 20,
    color: Colors.confirm,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
  vwImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


export default styles;