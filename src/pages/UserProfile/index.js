import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Gap, Header, List, Profile } from "../../components";
import { colors, getData } from "../../utils";
import { ILNullPhoto } from "../../assets";
import { getAuth, signOut } from "firebase/auth";

export default function UserProfile({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  })
  useEffect(() => {
    getData('user').then(res => {
      console.log('data user profile page: ', res);
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  },[]);
  const signOutUser = () =>{
    const auth = getAuth();
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        navigation.replace("Splash");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.replace("MainApp")} />
      <Gap height={40} />
      {profile.fullName.length > 0 && <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo}/>}
      
      <Gap height={16} />
      <View>
        <List
          name="Edit Profile"
          desc="Last Update Yesterday"
          type="next"
          icon="edit-profile"
          onPress={() => navigation.navigate("UpdateProfile")}
        />
        <List
          name="Language"
          desc="Available 10 languages"
          type="next"
          icon="language"
        />
        <List
          name="Give Us Rate"
          desc="On Google Play Store"
          type="next"
          icon="rate"
        />
        <List name="Sign Out" desc="Help Center" type="next" icon="help" onPress={signOutUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
