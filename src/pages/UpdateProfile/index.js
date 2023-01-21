import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, Input, Profile, Button, Gap } from "../../components";
import { colors } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";

export default function UpdateProfile({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove={true} />
          <Gap height={24} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Occupation" />
          <Gap height={24} />
          <Input label="Email" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={() => navigation.goBack("UserProfile")}
          />
        </View>
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
