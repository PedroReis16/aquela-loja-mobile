import { StyleSheet } from "react-native";

import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "top-center",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    padding: 16,
  },
});
