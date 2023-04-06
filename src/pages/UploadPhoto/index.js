import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Button, Gap, Header, Link } from "../../components";
import { ILNullPhoto } from "../../assets/illustration";
import { IconAddPhoto, IconRemovePhoto } from "../../assets/icon";
import { colors, fonts } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import { Firebase } from "../../config";
import { storeData,getData } from "../../utils";
import { getDatabase, ref, set, update } from "firebase/database";

export default function UploadPhoto({ navigation, route }) {
  const { fullName, profession, email, uid } = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState("");
  const getImage = () => {
    launchImageLibrary({ includeBase64: true, quality: 0.5, maxHeight: 200, maxWidth: 200 }, (response) => {
      console.log("response: ", response);
      if (!response.didCancel) {
        setPhotoForDB(
          `data:${response.assets[0].type};base64, ${response.assets[0].base64}`
        );

        const source = { uri: response.assets[0].uri };
        setPhoto(source);
        setHasPhoto(true);
      } else if (response.didCancel || response.error) {
        showMessage({
          message: "Please choose the photo",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      }
    });
  };

  const uploadAndContinue = () => {
    const db = getDatabase();
    const newData = {
      fullName: fullName,
      profession: profession,
      email: email,
      uid: uid,
      photo: photoForDB
    };
    storeData("user", newData);
    console.log(newData);
    const updates = {}
    updates["users/" + uid + "/"] = newData;
    update(ref(db), updates);
    getData('user').then(res => {
      console.log('data user doctor page: ', res);
    })
    navigation.replace("MainApp")
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            disable={!hasPhoto}
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for now"
            align="center"
            size={16}
            onPress={() => navigation.replace("MainApp")}
          />
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
    borderRadius: 55,
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
