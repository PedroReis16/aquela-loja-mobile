import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { styles } from "./NewCardScreenStyle";
import { AuthContext } from "../../context/AuthContext";
import { addCard } from "../../../app/db/CardDao";

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1.586; // Proporção padrão de cartões de crédito
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const CreditCardScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  // Estados para os campos do formulário
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validationState, setValidationState] = useState({
    cardNumber: null,
    cardholderName: null,
    expiryDate: null,
    cvv: null,
  });

  // Refs para animação
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  // Processar a rotação do cartão
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }, { scale: cardScale }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }, { scale: cardScale }],
  };

  // Efeito para virar o cartão quando o CVV está em foco
  useEffect(() => {
    if (focusedField === "cvv") {
      flipToBack();
    } else if (isFlipped) {
      flipToFront();
    }
  }, [focusedField]);

  // Função para virar o cartão para frente
  const flipToFront = () => {
    setIsFlipped(false);
    Animated.spring(flipAnimation, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  // Função para virar o cartão para trás
  const flipToBack = () => {
    setIsFlipped(true);
    Animated.spring(flipAnimation, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  // Função para animar o cartão quando um campo recebe foco
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Detecta o tipo de cartão com base nos primeiros dígitos
  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\s+/g, "");

    // Padrões para diferentes bandeiras de cartão
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      elo: /^(?:401178|401179|438935|457631|457632|504175|627780|636297|636368|651652|651653|651654|651655|651656|651657|651658|651659|655000|655001|655002)/,
      hipercard: /^(?:606282|637095|637568|637599|637609|637612)/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cleanNumber)) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }

    return cleanNumber.length > 0 ? "Card" : "";
  };

  // Formata o número do cartão enquanto o usuário digita
  const formatCardNumber = (text) => {
    const cleanText = text.replace(/\D/g, "");

    // Detecta o tipo do cartão
    const detectedType = detectCardType(cleanText);
    setCardType(detectedType);

    // Formato para American Express (4 + 6 + 5)
    if (detectedType === "Amex") {
      const formatted = cleanText.match(/.{1,4}/g)?.join(" ") || cleanText;
      const result = formatted.substring(0, 17); // 15 dígitos + 2 espaços
      validateField("cardNumber", result);
      return result;
    }

    // Formato padrão para outros cartões (4 + 4 + 4 + 4)
    const formatted = cleanText.match(/.{1,4}/g)?.join(" ") || cleanText;
    const result = formatted.substring(0, 19); // 16 dígitos + 3 espaços
    validateField("cardNumber", result);
    return result;
  };

  // Formata a data de validade enquanto o usuário digita
  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    let result = "";

    if (cleaned.length >= 3) {
      result = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    } else if (cleaned.length === 2) {
      result = `${cleaned}/`;
    } else {
      result = cleaned;
    }

    validateField("expiryDate", result);
    return result;
  };

  // Manipulador para alterar o nome do titular
  const handleCardholderNameChange = (text) => {
    setCardholderName(text);
    validateField("cardholderName", text);
  };

  // Manipulador para alterar o CVV
  const handleCvvChange = (text) => {
    const cleanText = text.replace(/\D/g, "");
    setCvv(cleanText);
    validateField("cvv", cleanText);
  };

  // Valida o número do cartão usando algoritmo de Luhn
  const validateCardNumber = (number) => {
    const digits = number.replace(/\D/g, "");

    if (!digits) return false;

    // Validação do comprimento
    if (cardType === "Amex" && digits.length !== 15) return false;
    if (cardType !== "Amex" && digits.length !== 16) return false;

    // Algoritmo de Luhn
    let sum = 0;
    let shouldDouble = false;

    // Percorre os dígitos da direita para a esquerda
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // Valida a data de validade
  const validateExpiryDate = (date) => {
    const pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!pattern.test(date)) return false;

    const [month, year] = date.split("/");
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);

    return expiry >= today;
  };

  // Valida o CVV
  const validateCVV = (cvvValue) => {
    const cvvLength = cardType === "Amex" ? 4 : 3;
    return /^\d+$/.test(cvvValue) && cvvValue.length === cvvLength;
  };

  // Valida o nome do titular
  const validateCardholderName = (name) => {
    return name.trim().length >= 3;
  };

  // Função para validar cada campo durante a digitação
  const validateField = (fieldName, value) => {
    let isValid = null; // null = não validado, true = válido, false = inválido

    if (value) {
      switch (fieldName) {
        case "cardNumber":
          // Só valida se tiver o comprimento correto
          const digits = value.replace(/\D/g, "");
          if (
            (cardType === "Amex" && digits.length === 15) ||
            (cardType !== "Amex" && digits.length === 16)
          ) {
            isValid = validateCardNumber(value);
          }
          break;
        case "cardholderName":
          isValid = validateCardholderName(value);
          break;
        case "expiryDate":
          // Só valida se tiver o formato completo MM/AA
          if (/^\d{2}\/\d{2}$/.test(value)) {
            isValid = validateExpiryDate(value);
          }
          break;
        case "cvv":
          isValid = validateCVV(value);
          break;
        default:
          break;
      }
    }

    setValidationState((prev) => ({
      ...prev,
      [fieldName]: isValid,
    }));
  };

  // Simula a submissão para um servidor
  const saveCardToServer = (cardData) => {
    return new Promise((resolve) => {
      addCard(cardData);

      resolve({ success: true });
    });
    // return new Promise((resolve) => {
    //   // Simulação de uma chamada de API
    //   setTimeout(() => {
    //     resolve({ success: true });
    //   }, 1500);
    // });
  };

  // Manipula a submissão do formulário
  const handleSubmit = async () => {
    const newErrors = {};

    // Valida o número do cartão
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Número do cartão é obrigatório";
    } else if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = "Número de cartão inválido";
    }

    // Valida o nome do titular
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Nome do titular é obrigatório";
    } else if (!validateCardholderName(cardholderName)) {
      newErrors.cardholderName = "Nome muito curto";
    }

    // Valida a data de validade
    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Data de validade é obrigatória";
    } else if (!validateExpiryDate(expiryDate)) {
      newErrors.expiryDate = "Data de validade inválida";
    }

    // Valida o CVV
    if (!cvv.trim()) {
      newErrors.cvv = "CVV é obrigatório";
    } else if (!validateCVV(cvv)) {
      newErrors.cvv = `CVV deve ter ${cardType === "Amex" ? "4" : "3"} dígitos`;
    }

    setErrors(newErrors);

    // Se não houver erros, envia o formulário
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const cardData = {
          cardNumber: cardNumber.replace(/\s+/g, ""),
          holderName: cardholderName,
          expiryDate,
          cvv,
          type: cardType,
          userId: user.role,
        };

        // Envia para o "servidor"
        const result = await saveCardToServer(cardData);

        if (result.success) {
          Alert.alert("Sucesso", "Cartão cadastrado com sucesso!", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } catch (error) {
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao cadastrar o cartão. Tente novamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Renderiza o componente do cartão de crédito virtual
  const renderCreditCard = () => {
    // Determina o background do cartão com base no tipo
    const getCardBackground = () => {
      switch (cardType) {
        case "Visa":
          return ["#436D99", "#2D57F2"];
        case "Mastercard":
          return ["#C69A50", "#DE6326"];
        case "Amex":
          return ["#2557D6", "#5576DD"];
        case "Discover":
          return ["#F58220", "#ED7225"];
        case "Elo":
          return ["#EF4123", "#121A16"];
        case "Hipercard":
          return ["#822124", "#C4333B"];
        default:
          return ["#363636", "#666666"];
      }
    };

    const cardBackground = getCardBackground();

    // Renderiza o cartão
    return (
      <View
        style={[
          styles.cardContainer,
          {
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.card,
            frontAnimatedStyle,
            {
              backgroundColor: cardBackground[0],
              // Gradiente simulado com dois elementos
              borderBottomColor: cardBackground[1],
              borderBottomWidth: CARD_HEIGHT / 2,
            },
            { backfaceVisibility: "hidden" },
          ]}
        >
          {/* Frente do cartão */}
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <View style={styles.cardChip} />
              <Text style={styles.cardType}>{cardType || "Card"}</Text>
            </View>

            <Text style={styles.cardNumber}>
              {cardNumber || "•••• •••• •••• ••••"}
            </Text>

            <View style={styles.cardBottomRow}>
              <View>
                <Text style={styles.cardLabel}>TITULAR DO CARTÃO</Text>
                <Text style={styles.cardHolder}>
                  {cardholderName || "SEU NOME AQUI"}
                </Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>VALIDADE</Text>
                <Text style={styles.cardExpiry}>{expiryDate || "MM/AA"}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            backAnimatedStyle,
            { backgroundColor: cardBackground[0] },
            { backfaceVisibility: "hidden" },
          ]}
        >
          {/* Verso do cartão */}
          <View style={styles.cardBackContent}>
            <View style={styles.cardBlackBar} />
            <View style={styles.cardCvvContainer}>
              <Text style={styles.cardCvvLabel}>CVV</Text>
              <View style={styles.cardCvvStrip}>
                <Text style={styles.cardCvvText}>
                  {cvv ? "•".repeat(cvv.length) : ""}
                </Text>
              </View>
            </View>
            <Text style={[styles.cardType, styles.cardBackType]}>
              {cardType || "Card"}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  // Renderiza o ícone de status da validação para cada campo
  const renderValidationStatus = (field) => {
    const status = validationState[field];

    if (status === null) return null;

    return (
      <View
        style={[
          styles.validationIndicator,
          status ? styles.validField : styles.invalidField,
        ]}
      >
        <Text style={styles.validationIndicatorText}>{status ? "✓" : "✗"}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cartão de crédito animado */}
          {renderCreditCard()}

          {/* Formulário */}
          <View style={styles.form}>
            {/* Número do cartão */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número do Cartão</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "cardNumber" && styles.inputFocused,
                    errors.cardNumber && styles.inputError,
                    validationState.cardNumber === true && styles.inputValid,
                  ]}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  onFocus={() => handleFocus("cardNumber")}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="numeric"
                  maxLength={19}
                  editable={!isSubmitting}
                />
                {renderValidationStatus("cardNumber")}
              </View>
              {errors.cardNumber && (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              )}
            </View>

            {/* Nome do titular */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Titular</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "cardholderName" && styles.inputFocused,
                    errors.cardholderName && styles.inputError,
                    validationState.cardholderName === true &&
                      styles.inputValid,
                  ]}
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  value={cardholderName}
                  onChangeText={handleCardholderNameChange}
                  onFocus={() => handleFocus("cardholderName")}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="characters"
                  editable={!isSubmitting}
                />
                {renderValidationStatus("cardholderName")}
              </View>
              {errors.cardholderName && (
                <Text style={styles.errorText}>{errors.cardholderName}</Text>
              )}
            </View>

            <View style={styles.rowContainer}>
              {/* Data de validade */}
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Validade</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === "expiryDate" && styles.inputFocused,
                      errors.expiryDate && styles.inputError,
                      validationState.expiryDate === true && styles.inputValid,
                    ]}
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChangeText={(text) =>
                      setExpiryDate(formatExpiryDate(text))
                    }
                    onFocus={() => handleFocus("expiryDate")}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="numeric"
                    maxLength={5}
                    editable={!isSubmitting}
                  />
                  {renderValidationStatus("expiryDate")}
                </View>
                {errors.expiryDate && (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                )}
              </View>

              {/* CVV */}
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === "cvv" && styles.inputFocused,
                      errors.cvv && styles.inputError,
                      validationState.cvv === true && styles.inputValid,
                    ]}
                    placeholder={cardType === "Amex" ? "0000" : "000"}
                    value={cvv}
                    onChangeText={handleCvvChange}
                    onFocus={() => handleFocus("cvv")}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="numeric"
                    maxLength={cardType === "Amex" ? 4 : 3}
                    secureTextEntry
                    editable={!isSubmitting}
                  />
                  {renderValidationStatus("cvv")}
                </View>
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão fixo na parte inferior */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
            Object.values(validationState).every((val) => val === true) &&
              styles.submitButtonValid,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Salvar Cartão</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Para uso com o React Navigation
export default CreditCardScreen;
