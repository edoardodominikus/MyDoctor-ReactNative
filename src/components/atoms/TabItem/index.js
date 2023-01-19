import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconDoctor, IconDoctorActive, IconHospital, IconHospitalActive, IconMessages, IconMessagesActive } from "../../../assets/icon";
import { colors, fonts } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabItem({ title, active, onPress,onLongPress }) {
  const Icon = () => {
    if (title === "Doctor") {
      return active? <IconDoctorActive/> : <IconDoctor />;
    }
    if (title === "Messages") {
      return active? <IconMessagesActive/> : <IconMessages />;
    }
    if (title === "Hospital") {
      return active? <IconHospitalActive/> : <IconHospital />;
    }
    return <IconDoctor />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: (active) => ({
    fontSize: 10,
    color: active? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
