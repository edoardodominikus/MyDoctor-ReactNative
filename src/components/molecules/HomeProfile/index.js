import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { DummyUser } from "../../../assets/dummy";
import { colors, fonts } from "../../../utils";
export default function HomeProfile() {
  return (
    <View style={styles.container}>
      <Image source={DummyUser} style={styles.avatar} />
      <View>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.occupation}>Job</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12
  },
  name:{
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  occupation:{
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  }
});
