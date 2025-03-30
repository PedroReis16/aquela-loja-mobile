import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  nome: {
    fontSize: 25,
    marginLeft: 4,
    alignSelf: 'center',
    alignContent: 'center'
  },
  icone: {
    marginBottom: 5,
    alignSelf: 'center'
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default styles