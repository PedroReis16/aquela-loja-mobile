import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Função para avançar para a próxima imagem
  const goToNextSlide = () => {
    // Se estamos na última imagem, voltar para a primeira
    if (activeIndex === images.length - 1) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    } else {
      // Caso contrário, avançar para a próxima
      scrollViewRef.current.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    }
  };

  // Configuração do timer para autoplay
  useEffect(() => {
    let timer;

    if (autoPlay && images?.length > 1) {
      timer = setInterval(() => {
        goToNextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval, images?.length]);

  // Função que lida com o evento de rolagem
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Função para navegar para um slide específico
  const goToSlide = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
    }
  };

  // Renderização dos indicadores de paginação
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              { opacity: activeIndex === index ? 1 : 0.5 },
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    );
  };

  // Verificar se há imagens para exibir
  if (!images || images.length === 0) {
    return (
      <View style={styles.noImagesContainer}>
        <Text>Nenhuma imagem disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollViewContent}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>
      {images.length > 1 && renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  noImagesContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});

export default ImageCarousel;
