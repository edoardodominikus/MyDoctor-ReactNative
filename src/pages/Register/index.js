import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Gap, Header, Input, Loading } from "../../components";
import { colors } from "../../utils/colors";
import { useForm } from "../../utils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firebase } from "../../config";
import { showMessage } from "react-native-flash-message";

export default function Register({ navigation }) {
  const [form, setForm] = useForm({
    fullName: "",
    profession: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const onContinue = () => {
    console.log("onContinue");
    console.log(form);
    setLoading(true);
    const auth = getAuth(Firebase);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        setForm("reset");
        var user = userCredential.user;
        console.log("Register Success:", userCredential)
        // ...
      })
      .catch((error) => {
        setLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log("Register Error: ", errorMessage);
        // ..
      });
    // navigation.navigate("UploadPhoto");
  };
  return (
    <>
      <View style={styles.page}>
        <Header
          title="Register Account"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(value) => setForm("fullName", value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={form.profession}
            onChangeText={(value) => setForm("profession", value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
