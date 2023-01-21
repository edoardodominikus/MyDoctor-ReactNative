import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Gap } from "../../atoms";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils";
import DarkProfile from "./DarkProfile";
export default function Header({ title, onPress, type }) {
  if(type==="dark-profile"){
    return <DarkProfile />
  }
  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === "dark" ? "back-light" : "back-dark"}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === "dark" ? colors.secondary : colors.white,
    flexDirection: "row",
    alignItems: 'center',
    borderBottomLeftRadius: type === "dark" ? 20 : 0,
    borderBottomRightRadius: type === "dark" ? 20 : 0,
  }),
  text: (type) => ({
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: type === "dark" ? colors.white : colors.text.primary,
  }),
});
