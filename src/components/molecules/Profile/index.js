import { StyleSheet, Text, View, Image } from "react-native";
import { DummyUser, IconRemovePhoto } from "../../../assets";
import React from "react";
import { colors, fonts } from "../../../utils";

export default function Profile({ name, desc, isRemove }) {
  return (
    <View style={styles.container}>
      <View style={styles.borderProfile}>
        <Image style={styles.avatar} source={DummyUser} />
        {isRemove && <IconRemovePhoto style={styles.removePhoto}/>}
      </View>
      {
        name && (
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.occupation}>{desc}</Text>
          </View>
        )
      }
      
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
    position: 'absolute',
    right: 8,
    bottom: 8,
  }
});
