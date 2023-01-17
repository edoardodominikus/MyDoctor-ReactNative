import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ILLOGO } from "../../assets/illustration";

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("GetStarted");
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <ILLOGO />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#112340",
    marginTop: 20,
  },
});
