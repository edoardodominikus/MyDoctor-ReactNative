import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, fonts } from "../../../utils";
import IconOnly from "./IconOnly";
import BtnIconSend from "./BtnIconSend";

export default function Button({ type, title, onPress, icon, disable }) {
  if (type === "icon-only") {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if (type === "btn-icon-send") {
    return <BtnIconSend disable={disable} onPress={onPress}/>;
  }
  if(disable){
    return (
      <View style={styles.disabledBackground} >
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );  
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor:
      type === "secondary"
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  disabledBackground:{
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.disable.background,
  },
  disableText:{
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: "center",
    color: colors.button.disable.text,
  },
  text: (type) => ({
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: "center",
    color:
      type === "secondary"
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),
});
