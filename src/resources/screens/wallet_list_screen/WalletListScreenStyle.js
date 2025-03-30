import { StyleSheet } from "react-native";

import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: Colors.primaryColor,
    width: 64,
    height: 64,
    borderRadius: 16,
    elevation: 8,
    position: "absolute",
    bottom: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
