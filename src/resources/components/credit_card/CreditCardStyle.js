import { StyleSheet } from "react-native";

import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  cardType: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  cardNumber: {
    color: "white",
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 30,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHolder: {
    color: "white",
    fontSize: 14,
  },
  cardExpiry: {
    color: "white",
    fontSize: 14,
  },
});
