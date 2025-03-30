import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 5,
    width: "100%",
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 25,
    marginLeft: 4,
    alignSelf: "center",
    alignContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    marginVertical: 8,
    gap: 16,
    alignSelf: "center",
  },
});

export default styles;
