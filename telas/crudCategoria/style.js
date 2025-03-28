import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top-center',
    },
    txtCampo: {
        width: '100%',
        borderBlockColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center'
    },
    vwCampos: {
        marginTop: 30,
        width: '70%'
    },
    btnCriar: {
        backgroundColor: 'rgb(94, 84, 230)',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 20
    },
    btnText: {
        fontSize: 20,
    },
    campoText: {
        fontSize: 20,
    }
});

export default styles