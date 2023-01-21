import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, List } from "../../components/molecules";
import { DummyDoctor1 } from "../../assets";
import { colors, fonts } from "../../utils";
export default function ChooseDoctor({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Choose Pediatrician" type="dark"  onPress={() => navigation.goBack()} />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexandra Jennie"
        desc="Female"
        onPress={() => navigation.navigate("Chatting")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
});
