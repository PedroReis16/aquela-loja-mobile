import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 210,
    width: "95%",
    borderRadius: 16,
    overflow: "hidden",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
//   imageContainer: {
//     width,
//     height: 250,
//   },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  noImagesContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
