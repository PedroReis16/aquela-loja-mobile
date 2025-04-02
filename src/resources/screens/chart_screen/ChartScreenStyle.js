import { StyleSheet, Dimensions } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primaryColor,
  },
  chartTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    color: Colors.primaryColor,
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    width: width - 40,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
});

export default styles