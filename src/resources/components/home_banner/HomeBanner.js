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
import { styles } from "./HomeBannerStyle"; // Importando os estilos do arquivo HomeBannerStyle.js

const { width } = Dimensions.get("window");

export const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Função para avançar para a próxima imagem usando a função de atualização do state
  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
      return nextIndex;
    });
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
  }, [autoPlay, autoPlayInterval, images?.length]);

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
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
      setActiveIndex(index);
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
          <View key={index} style={{ width, height: 250 }}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>
      {images.length > 1 && renderPagination()}
    </View>
  );
};
