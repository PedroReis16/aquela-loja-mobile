
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

export function TabBar({ state, descriptors, navigation }) {

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#f8f8f8',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            paddingVertical: 10,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Mapeamento de ícones
                const iconMap = {
                    Home: 'home',
                    Profile: 'user'
                };

                const iconName = iconMap[route.name] || 'circle';

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {<FeatherIcons
                            name={iconName}
                            color={isFocused ? '#007bff' : '#888'}
                            size={24}
                            strokeWidth={isFocused ? 2.5 : 1.5}
                        />}
                        <Text style={{
                            color: '#007bff',
                            fontSize: 10,
                            marginTop: 4
                        }}>
                            {route.name}
                        </Text>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}