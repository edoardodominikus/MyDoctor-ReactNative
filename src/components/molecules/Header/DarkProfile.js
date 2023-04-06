import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors, fonts } from "../../../utils";
import { Button } from "../../atoms";

export default function DarkProfile({onPress, title, desc, photo}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress}/>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.occupation}>{desc}</Text>
      </View>
      <Image style={styles.avatar} source={photo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  occupation: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    color: colors.text.subTitle,
    textAlign: "center",
},
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  }
});
