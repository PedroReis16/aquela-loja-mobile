import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "start",
  },
  categoryContainer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
  },
  categoryTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    color: Colors.black,
    paddingHorizontal: 16,
  },
  categoryIcon: {
    marginTop: 16,
  },
  categoryDivider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    marginVertical: 8,
  },
});
