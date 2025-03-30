import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";


export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    backButton: {
      padding: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    placeholder: {
      width: 40, // Balanceia o layout com o botão de voltar
    },
    formContainer: {
      flex: 1,
      marginTop: 16,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 8,
      color: "#555",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: "white",
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
    },
    pickerContainer: {
      flex: 1,
    },
    picker: {
      height: 50,
      width: "100%",
    },
    imageSelector: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 15,
      backgroundColor: "white",
    },
    imageSelectorText: {
      marginLeft: 10,
      color: "#555",
      fontSize: 16,
    },
    previewContainer: {
      alignItems: "center",
      marginTop: 16,
      borderRadius: 8,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "white",
    },
    imagePreview: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: "#e0e0e0",
      paddingTop: 16,
      paddingBottom: 8,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    },
    cancelButton: {
      backgroundColor: "#f2f2f2",
    },
    cancelButtonText: {
      color: "#666",
      fontWeight: "500",
    },
    deleteButton: {
      backgroundColor: "#fff0f0",
    },
    deleteButtonText: {
      color: "#d32f2f",
      fontWeight: "500",
    },
    saveButton: {
      backgroundColor: "#e0f7fa",
    },
    saveButtonText: {
      color: "#0277bd",
      fontWeight: "500",
    },
  });
  