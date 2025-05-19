import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text style={styles.tabLabel}>{label === 'Characters' ? 'ALL CHARACTERS' : 'LIKED CHARACTERS'}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#2C4231',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabActive: {
    backgroundColor: '#224229',
  },
  tabInactive: {
    backgroundColor: '#162C1B',
  },
  tabLabel: {
    color: '#E3EAE3',
    fontSize: 16,
    fontFamily: 'DMMono-Medium',
    letterSpacing: 2,
  },
}); 