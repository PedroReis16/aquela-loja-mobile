import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextInput, Image } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { styles } from "./LoginScreenStyle";

export default function LoginScreen({ navigation, route }) {
  const intendedScreen = "Perfil";
  const { login } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      login({ username, role: "admin" });
      try {
        navigation.navigate(intendedScreen);
        setLoginError(false);
      } catch (error) {
        navigation.navigate("Home");
      }
    } else if (username === "user" && password === "user") {
      login({ username, role: "user" });
      try {
        navigation.navigate(intendedScreen);
        setLoginError(false);
      } catch (error) {
        navigation.navigate("Home");
      }
    } else {
      setLoginError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Image
        source={require("../../../../assets/logo-black.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {loginError && (
        <Text style={styles.errorText}>Email ou senha incorretos</Text>
      )}

      <Text style={styles.label}>Email:</Text>
      <View style={styles.inputContainer}>
        <FeatherIcons name={Icons.Perfil} style={styles.inputIcon} size={20} />
        <TextInput
          style={styles.input}
          placeholder="exemplo@gmail.com"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.label}>Senha:</Text>
      <View style={styles.inputContainer}>
        <FeatherIcons
          name={Icons.Passoword}
          style={styles.inputIcon}
          size={20}
        />
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <FeatherIcons
            name={isPasswordVisible ? Icons["Visible"] : Icons["Invisible"]}
            style={styles.inputIcon}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
