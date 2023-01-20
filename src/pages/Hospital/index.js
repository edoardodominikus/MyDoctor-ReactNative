import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import { ILHospitalBG } from "../../assets/illustration";
import { fonts, colors } from "../../utils";
import { ListHospital } from "../../components";
import { DummyHospital1, DummyHospital2, DummyHospital3 } from "../../assets";
export default function Hospital() {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.available}>3 available</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="General Hospital"
          name="Citra Bunga Merdeka"
          address="Jln. Surya Sejahtera 20"
          pic={DummyHospital1}
        />
        <ListHospital
          type="Children's Hospital"
          name="Happy Family Kids"
          address="Jln. Surya Sejahtera 21"
          pic={DummyHospital2}
        />
        <ListHospital
          type="Psychiatric Hospital"
          name="Bryde Hospital"
          address="Jln. Surya Sejahtera 22"
          pic={DummyHospital3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: "center",
  },
  available: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.white,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: "center",
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
