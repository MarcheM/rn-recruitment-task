import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CharacterListScreen } from './screens/CharacterList';
import { FavoriteCharactersScreen } from './screens/FavoriteCharacters';
import { CustomTabBar } from './CustomTabBar';

const Tab = createBottomTabNavigator();

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} /> }>
      <Tab.Screen name="Characters" component={CharacterListScreen} />
      <Tab.Screen name="Favorites" component={FavoriteCharactersScreen} />
    </Tab.Navigator>
  );
};
