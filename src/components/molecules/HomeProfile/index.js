import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { DummyUser } from "../../../assets/dummy";
import { colors, fonts } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ILNullPhoto } from "../../../assets";
import { getData } from "../../../utils";
export default function HomeProfile({ onPress }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  })
  useEffect(() => {
    getData('user').then(res => {
      console.log('data user homeprofile page: ', res);
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  },[]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.occupation}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  occupation: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    textTransform: 'capitalize',
    color: colors.text.secondary,
  },
});
