/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import AuthHomeScreen from './src/screens/AuthHomeScreen';
import AuthStackNavigator from './src/screens/navigation/AuthStackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {},
  inputContainer: {},
  input: {},
});

export default App;
