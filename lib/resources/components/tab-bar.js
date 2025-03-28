import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

const ICON_MAP = {
    Home: 'home',
    Profile: 'user'
};

const styles = {
    container: {
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
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabLabel: {
        color: '#007bff',
        fontSize: 10,
        marginTop: 4
    }
};


const TabItem = ({ route, isFocused, onPress }) => {
    const iconName = ICON_MAP[route.name] || 'circle';
    
    return (
        <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
        >
            <FeatherIcons
                name={iconName}
                color={isFocused ? '#007bff' : '#888'}
                size={24}
                strokeWidth={isFocused ? 2.5 : 1.5}
            />
            <Text style={styles.tabLabel}>
                {route.name}
            </Text>
        </TouchableOpacity>
    );
};

export const TabBar = ({ state, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
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

                return (
                    <TabItem
                        key={route.key}
                        route={route}
                        isFocused={isFocused}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
};