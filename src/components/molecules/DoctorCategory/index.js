import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ILCatUmum } from "../../../assets/illustration";
import { colors, fonts } from "../../../utils";

export default function DoctorCategory() {
  return (
    <View style={styles.container}>
      <ILCatUmum style={styles.illustration} />
      <Text style={styles.label}>I need</Text>
      <Text style={styles.category}>General Practitioner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: "flex-start",
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 140
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
