import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../app/models/Colors";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
  },
  profileInfo: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  adminText: {
    fontSize: 14,
    color: "#00BCD4",
    marginLeft: 4,
  },
  logoutButton: {
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoutIcon: {
    color: Colors.error,
  },
});
