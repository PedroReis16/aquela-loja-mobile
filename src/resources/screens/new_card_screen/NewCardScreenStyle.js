import { StyleSheet } from "react-native";

import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 22,
    color: "#2196F3",
  },
  headerRight: {
    width: 40,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  // Estilos para o cartão
  cardContainer: {
    marginVertical: 25,
    perspective: 1000, // Para efeito 3D
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardBackContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardChip: {
    width: 50,
    height: 40,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    opacity: 0.8,
  },
  cardType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardBackType: {
    alignSelf: "flex-end",
    margin: 20,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: "500",
    color: "#fff",
    letterSpacing: 2,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  cardHolder: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textTransform: "uppercase",
  },
  cardExpiry: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  cardBlackBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    marginTop: 20,
  },
  cardCvvContainer: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  cardCvvLabel: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  cardCvvStrip: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 5,
  },
  cardCvvText: {
    fontSize: 16,
    textAlign: "right",
    letterSpacing: 2,
  },
  // Estilos para o formulário
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#2196F3",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  inputValid: {
    borderColor: "#4CD964",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  validationIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  validField: {
    backgroundColor: "#4CD964",
  },
  invalidField: {
    backgroundColor: "#FF3B30",
  },
  validationIndicatorText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  tipText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#a0d1f7",
  },
  submitButtonValid: {
    backgroundColor: "#4CD964",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
