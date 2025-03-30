import { Text, TouchableOpacity } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import { ICON_MAP as Icons } from "../../../app/models/Icons";
import { styles } from "../tab_bar/styles/TabItemStyle";
import { COLORS as Colors } from "../../../app/models/Colors";

export const TabItem = ({ route, isFocused, onPress }) => {
  const iconName = Icons[route.name] || "circle";

  return (
    <TouchableOpacity
      key={route.key}
      onPress={onPress}
      style={styles.tabButton}
    >
      <FeatherIcons
        name={iconName}
        color={isFocused ? Colors.primaryColor : Colors.darkGrey}
        size={24}
        strokeWidth={isFocused ? 2.5 : 1.5}
      />
      <Text style={styles.tabLabel}>{route.name}</Text>
    </TouchableOpacity>
  );
};
