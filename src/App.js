import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GetStarted, Splash } from './pages';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';

export default function App() {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})