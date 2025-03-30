import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(247, 140, 0, 0.85)',
        alignItems: 'center',
        justifyContent: 'top-center',
    },
    txtCampo: {
        width: '100%',
        borderBlockColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        fontSize: 20,
        backgroundColor: 'rgb(16, 0, 247)',
        color: 'white',
    },
    vwCampos: {
        marginTop: 30,
        width: '70%'
    },
    btnCriar: {
        backgroundColor: 'rgb(16, 0, 247)',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 20
    },
    btnText: {
        color: 'white',
        fontSize: 25,
    },
    campoText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    scvCards: {
        marginTop: 40,
        width: '80%',
    }
});

export default styles