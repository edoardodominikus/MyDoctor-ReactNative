import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Input, Profile, Button, Gap } from "../../components";
import { colors, getData, storeData } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { ILNullPhoto } from "../../assets";
import { getDatabase, ref, set, update } from "firebase/database";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";

export default function UpdateProfile({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: "",
    profession: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState("");

  useEffect(() => {
    getData("user").then((res) => {
      // console.log("data user profile page: ", res);
      const data = res;
      // data.photo = {uri: res.photo};
      setPhoto({ uri: res.photo });
      setProfile(data);
    });
  }, []);
  const save = () => {
    console.log("profile: ", profile);
    console.log("new password:", password);
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: "Password is less than 6 characters",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        //update password
        updatePasswordData();
        updateProfileData();
        navigation.replace("UserProfile");
      }
    } else {
      updateProfileData();
      navigation.replace("UserProfile");
    }
  };

  const updatePasswordData = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updatePassword(user, password)
          .catch((error) => {
            // An error ocurred
            // ...
            showMessage({
              message: error.message,
              type: "default",
              backgroundColor: colors.error,
              color: colors.white,
            });
          });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    console.log("data.photo: ",data)
    const db = getDatabase();
    const updates = {};
    updates["users/" + profile.uid + "/"] = data;
    update(ref(db), updates);
    console.log("data after save: ", data);
    storeData("user", data);
  };
  
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const getImage = () => {
    launchImageLibrary(
      { includeBase64: true, quality: 0.5, maxHeight: 200, maxWidth: 200 },
      (response) => {
        console.log("response: ", response);
        if (!response.didCancel) {
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`
          );

          const source = { uri: response.assets[0].uri };
          setPhoto(source);
        } else if (response.didCancel || response.error) {
          showMessage({
            message: "Please choose the photo",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        }
      }
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile photo={photo} isRemove onPress={getImage} />
          <Gap height={24} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText("fullName", value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={profile.profession}
            onChangeText={(value) => changeText("profession", value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={save} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
