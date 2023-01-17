import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Gap } from "../../atoms";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils";
export default function Header({title,onPress}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-dark" onPress={onPress}/>
      <Text style={styles.text}>{title}</Text>
      <Gap width={24}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
  },
});
