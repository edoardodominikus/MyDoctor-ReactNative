import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ILLOGO } from "../../assets/illustration";
import { Input, Link, Button, Gap } from "../../components/atoms";
import { Loading } from "../../components";
import { colors, fonts, storeData, useForm } from "../../utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Login({ navigation }) {
  const [form, setForm] = useForm({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const Login = () => {
    console.log("onLogin form: ", form);
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        setLoading(false);

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userCredential.user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("snapshot: ",snapshot.val());
              storeData('user', snapshot.val());
              navigation.replace("MainApp");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Signed in
        // console.log("Success Login", userCredential);
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error Login", error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: errorCode,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
    // navigation.replace("MainApp");
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ILLOGO />
          <Text style={styles.title}>Masuk dan Mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link fontsize={12} title="Forgot Password" />
          <Gap height={40} />
          <Button title="Sign in" onPress={Login} />
          <Gap height={30} />
          <Link
            fontsize={16}
            title="Create New Account"
            align="center"
            onPress={() => navigation.navigate("Register")}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: colors.white, flex: 1 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    maxWidth: 153,
  },
});
