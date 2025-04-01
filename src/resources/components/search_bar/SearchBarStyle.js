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
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.blue,
    marginTop: 14,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  logo: {
    marginTop: 14,
    marginLeft: 10,
    color: Colors.primaryColor,
    fontSize: 35,
  },
  imgLogo:{
    width: 55,
    height: 55,
    marginTop: 10,
    tintColor: "#00E0E0",
  },
  vwLogo: {
    flexDirection: 'row'
  }
});
