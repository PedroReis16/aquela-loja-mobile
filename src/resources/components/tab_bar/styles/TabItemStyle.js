import { StyleSheet } from "react-native";
import { COLORS as Colors } from "../../../../app/models/Colors";

export const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabLabel: {
        color: Colors.white,
        fontSize: 10,
        marginTop: 4
    }
});