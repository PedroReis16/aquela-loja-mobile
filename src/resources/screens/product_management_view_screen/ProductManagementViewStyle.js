import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "top-center",
  },
  txtCampo: {
    width: "100%",
    borderBlockColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 20,
    backgroundColor: "rgb(16, 0, 247)",
    color: "white",
  },
  vwCampos: {
    marginTop: 30,
    width: "70%",
  },

  btnText: {
    color: "white",
    fontSize: 25,
  },
  campoText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  picker: {
    height: 50,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },

  productView: {
    marginTop: 40,
    width: "100%",
    flex: 1,
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

export default styles;
