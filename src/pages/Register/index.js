import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Gap, Header, Input } from "../../components";
import { colors } from "../../utils/colors";
export default function Register({ navigation }) {
  return (
    <View style={styles.page}>
      <Header
        title="Register Account"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={24} />
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate("UploadPhoto");
          }}
        />
      </ScrollView>
    </View>
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
