import React from 'react';
import { View } from 'react-native';
import { TabItem } from './tab_item';
import { styles } from '../styles/components/tab_bar_components/tab_bar_style';




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