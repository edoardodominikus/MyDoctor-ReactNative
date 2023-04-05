import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import FlashMessage from "react-native-flash-message";
import { Loading } from "./components";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { LogBox } from 'react-native';

const App2 = () => {
  const stateGlobal = useSelector(state => state.counter);
  console.log("state global: ",stateGlobal );
  const dispatch = useDispatch(); 
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return(
    <Provider store={store}>
      <App2 />
    </Provider>
  )
};

export default App;
const styles = StyleSheet.create({});
