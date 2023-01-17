import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils";

export default function Link({ fontsize, title, align }) {
  return (
    <View>
      <Text style={styles.text(fontsize, align)}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: (fontsize, align) => ({
    fontSize: fontsize,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textDecorationLine: "underline",
    textAlign: align,
  }),
});
