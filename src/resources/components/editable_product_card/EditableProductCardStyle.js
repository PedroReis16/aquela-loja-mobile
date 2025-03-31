import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#888',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#555',
  },
  availabilityValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#2DD4BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4D4F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

// export const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     borderWidth: 2,
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   nome: {
//     fontSize: 25,
//     marginLeft: 4,
//     alignSelf: 'center',
//     alignContent: 'center'
//   },
//   icone: {
//     marginBottom: 5,
//     alignSelf: 'center'
//   },
//   imagem: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
// });
