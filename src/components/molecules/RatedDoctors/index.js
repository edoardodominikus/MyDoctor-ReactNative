import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { DummyDoctor1 } from "../../../assets/dummy";
import { IconStar } from "../../../assets/icon";
import { colors, fonts } from "../../../utils";

export default function RatedDoctors() {
  return (
    <View style={styles.container}>
      <Image source={DummyDoctor1} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>Doctor Name</Text>
        <Text style={styles.category}>Pediatrician</Text>
      </View>
      <View style={styles.rate}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profile: {
    flex: 1,
  },
  rate: {
    flexDirection: "row",
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
