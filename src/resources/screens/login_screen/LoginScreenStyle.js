import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: "#00E0E0",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 5,
    color: "#888",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    opacity: 0.5,
    color: Colors.gray,

    strokeWidth: 1.5,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
    fontSize: 16,
  },
  visibilityIcon: {
    width: 20,
    height: 20,
    opacity: 0.5,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#00E0E0",
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cursorIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  forgotPassword: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#888",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    color: "#888",
    fontSize: 14,
  },
  signupLink: {
    color: "#00E0E0",
    fontSize: 14,
  },
});
