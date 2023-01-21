import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ILLOGO } from "../../assets/illustration";
import { Input, Link, Button,Gap } from "../../components/atoms";
import { colors,fonts } from "../../utils";
export default function Login({navigation}) {
  return (
    <View style={styles.page}>
      <ILLOGO />
      <Text style={styles.title}>Masuk dan Mulai berkonsultasi</Text>
      <Input label="Email Address" />
      <Input label="Password" />
      <Gap height={10}/>
      <Link fontsize={12} title="Forgot Password"/>
      <Gap height={40}/>
      <Button title="Sign in" onPress={()=>navigation.replace("MainApp")}/>
      <Gap height={30}/>
      <Link fontsize={16} title="Create New Account" align="center" onPress={() => navigation.navigate("Register")}/>
    </View>
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
