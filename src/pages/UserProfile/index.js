import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Gap, Header, List, Profile } from "../../components";
import { colors } from "../../utils";

export default function UserProfile({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={40} />
      <Profile name="Shayna Melinda" desc="Product Designer"/>
      <Gap height={16} />
      <View>
        <List
          name="Edit Profile"
          desc="Last Update Yesterday"
          type="next"
          icon="edit-profile"
          onPress={() => navigation.navigate("UpdateProfile")}
        />
        <List
          name="language"
          desc="Available 10 languages"
          type="next"
          icon="language"
        />
        <List
          name="Give Us Rate"
          desc="On Google Play Store"
          type="next"
          icon="rate"
        />
        <List name="Help Center" desc="Help Center" type="next" icon="help" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
