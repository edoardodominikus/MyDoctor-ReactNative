import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { ILLOGO } from "../../assets/illustration";
import { Button, Gap, Input, Link } from "../../components/atoms";
import { set_loading } from "../../redux/counterSlice";
import { colors, fonts, storeData, useForm } from "../../utils";
import { showError } from "../../utils/showMessage";

export default function Login({ navigation }) {
  const [form, setForm] = useForm({ email: "", password: "" });

  const dispatch = useDispatch();

  const Login = () => {
    dispatch(set_loading({ value: true }));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        dispatch(set_loading({ value: false }));
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userCredential.user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              storeData("user", snapshot.val());
              navigation.replace("MainApp");
            } else {
            }
          })
          .catch((error) => {});
      })
      .catch((error) => {
        dispatch(set_loading({ value: false }));
        const errorCode = error.code;
        const errorMessage = error.message;
        showError(errorCode);
        // showMessage({
        //   message: errorCode,
        //   type: "default",
        //   backgroundColor: colors.error,
        //   color: colors.white,
        // });
      });
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
