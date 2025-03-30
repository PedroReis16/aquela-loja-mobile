import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, TextInput, Alert } from "react-native";
import { styles } from "./LoginScreenStyle";

export default function LoginScreen({ navigation, route }) {
  // Se houver uma tela pretendida, ela estará nos parâmetros da rota
  const intendedScreen = "Perfil";
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Verifica os usuários fixos e atribui um papel conforme as credenciais
    if (username === "admin" && password === "admin") {
      login({ username, role: "admin" });
      try {
        navigation.navigate(intendedScreen);
      } catch (error) {
        navigation.navigate("Home");
      }
    } else if (username === "user" && password === "user") {
      login({ username, role: "user" });
      try {
        navigation.navigate(intendedScreen);
      } catch (error) {
        navigation.navigate("Home");
      }
    } else {
      Alert.alert("Erro", "Credenciais inválidas!");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
