import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ILLOGO } from "../../assets/illustration";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // console.log("user: ", user);
          navigation.replace("MainApp");
          // ...
        } else {
          // User is signed out
          // ...
          navigation.replace("GetStarted");
        }
      });
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
