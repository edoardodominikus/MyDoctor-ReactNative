import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button, Gap, Header, Link } from "../../components";
import { ILNullPhoto } from "../../assets/illustration";
import { IconAddPhoto } from "../../assets/icon";
import { colors, fonts } from "../../utils";
export default function UploadPhoto({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()}/>
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image source={ILNullPhoto} style={styles.avatar} />
            <IconAddPhoto style={styles.addPhoto} />
          </View>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.profession}>Profession</Text>
        </View>
        <View>
          <Button title="Upload and Continue" onPress={() => navigation.replace("MainApp")} />
          <Gap height={30} />
          <Link title="Skip for now" align="center" size={16} onPress={() => navigation.replace("MainApp")}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  profile: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  addPhoto: {
    position: "absolute",
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: "center",
  },
  profession: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textAlign: "center",
  },
});
