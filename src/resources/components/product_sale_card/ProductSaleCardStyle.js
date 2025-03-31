import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "80%",
    borderRadius: 8,
  },
  contentContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 4,
  },
  installmentPrice: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "#22d3ee",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
