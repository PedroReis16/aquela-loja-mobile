import { View, Text } from "react-native";
import { styles } from "./HomeScreenStyle";
// import { HomeBanner } from "../../components/home_banner/HomeBanner";
import { ImageCarousel } from "../../components/home_banner/HomeBanner";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageCarousel
        images={[
          // require("../../../../assets/banner_images/banner-one.jpg"),
          require("../../../../assets/banner_images/banner-two.jpg"),
          require("../../../../assets/banner_images/banner-four.jpg"),
          require("../../../../assets/banner_images/banner-five.jpg"),
        ]}
      />
    </View>
  );
}
