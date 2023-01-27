import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ILLOGO } from "../../assets/illustration";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Splash({ navigation }) {
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          const uid = user.uid;
          navigation.replace("MainApp");
        } else {
          navigation.replace("GetStarted");
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [navigation]);
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
