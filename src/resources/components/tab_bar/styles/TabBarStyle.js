import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.black,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
