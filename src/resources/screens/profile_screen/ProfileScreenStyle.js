import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },

  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  cardRow: {
    flexDirection: "column",
    justifyContent: "start",
    gap: 8,
  },

  vwButtons: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    marginBottom: 40,
  },
  btnNav: {
    borderBlockColor: "rgb(255, 125, 3)",
    borderWidth: 4,
    borderRadius: 0,
    padding: 15,
  },
});
