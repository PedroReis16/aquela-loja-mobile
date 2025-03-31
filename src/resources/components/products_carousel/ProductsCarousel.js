import React, { useState, useRef } from "react";
import { View, Dimensions, TouchableOpacity, Animated } from "react-native";
import { ProductSaleCard } from "../product_sale_card/ProductSaleCard";
import { styles } from "./ProductCarouselStyle";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = width * 0.1;

export const Carousel = ({ items, onItemPress, renderItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCarouselItem = ({ item, index }) => {
    if (renderItem) {
      return renderItem({ item, index, scrollX });
    }

    return (
      <View
        style={[
          styles.itemContainer,
          { width: ITEM_WIDTH, marginHorizontal: ITEM_SPACING / 2 },
        ]}
      >
        <ProductSaleCard produto={item} adicionaCarrinho={onItemPress} />
      </View>
    );
  };

  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (ITEM_WIDTH + ITEM_SPACING));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item, index) =>
          `carousel-item-${index}-${item.id || ""}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING / 2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderCarouselItem}
      />

      <View style={styles.paginationContainer}>
        {items.map((_, index) => (
          <TouchableOpacity
            key={`indicator-${index}`}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
            onPress={() => {
              flatListRef.current?.scrollToOffset({
                offset: index * (ITEM_WIDTH + ITEM_SPACING),
                animated: true,
              });
              setActiveIndex(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};
