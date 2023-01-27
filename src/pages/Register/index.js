import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { Button, Gap, Header, Input } from "../../components";
import { Firebase } from "../../config";
import { set_loading } from "../../redux/counterSlice";
import { storeData, useForm } from "../../utils";
import { colors } from "../../utils/colors";

export default function Register({ navigation }) {
  const [form, setForm] = useForm({
    fullName: "",
    profession: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch(set_loading({ value: true }));

    const auth = getAuth(Firebase);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in

        dispatch(set_loading({ value: false }));

        setForm("reset");

        const db = getDatabase();
        var user = userCredential.user;
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: user.uid,
        };
        set(ref(db, "users/" + user.uid), data);
        storeData("user", data);

        navigation.navigate("UploadPhoto", data);
      })
      .catch((error) => {
        dispatch(set_loading({ value: false }));

        var errorCode = error.code;
        var errorMessage = error.message;
        showMessage({
          message: errorCode,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
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
