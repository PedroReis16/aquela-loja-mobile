import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "top-center",
  },
  newCategoryContainer: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveCategoryButton: {
    marginBottom: 20,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 10,
  },
  scvCards: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
});

export default styles;
