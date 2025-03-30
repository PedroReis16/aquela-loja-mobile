import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 4,
    padding: 16,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  productPrice: {
    fontSize: 16,
    color: "#000",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
});
