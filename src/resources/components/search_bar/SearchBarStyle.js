import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.black,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});
