import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Link({ fontsize, title, align, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(fontsize, align)}>{title}</Text>
    </TouchableOpacity>
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
