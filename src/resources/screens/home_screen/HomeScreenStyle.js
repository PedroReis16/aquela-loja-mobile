import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  productView: {
    marginTop: 16,
    width: "100%",
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
