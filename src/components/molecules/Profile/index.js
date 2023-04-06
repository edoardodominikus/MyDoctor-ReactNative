import { StyleSheet, Text, View, Image } from "react-native";
import { IconRemovePhoto } from "../../../assets";
import React from "react";
import { colors, fonts } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ name, desc, photo, isRemove, onPress }) {
 console.log("profile photo: ",photo);
  return (
    <View style={styles.container}>
      {!isRemove &&
        <View style={styles.borderProfile}>
          <Image style={styles.avatar} source={photo} />
        </View>
      }
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image style={styles.avatar} source={photo} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.occupation}>{desc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: "center",
  },
  occupation: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: "center",
  },
  removePhoto: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
