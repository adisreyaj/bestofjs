/*
 * File: App.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 9:50:36 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 17th June 2020 10:45:17 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import { SCREENS } from './src/config/screens.config';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.home} headerMode="none">
        <Stack.Screen name={SCREENS.home} component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
