import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ILCatPsikiater, ILCatUmum, ILCatObat } from "../../../assets/illustration";
import { colors, fonts } from "../../../utils";

export default function DoctorCategory({category}) {
  const Icon = () => {
    if(category === 'General Practitioner'){
      return <ILCatUmum style={styles.illustration} />
    }
    if(category === 'Psychiatrist'){
      return <ILCatPsikiater style={styles.illustration} />
    }
    if(category === 'Medicine'){
      return <ILCatObat style={styles.illustration} />
    }
    return <ILCatUmum style={styles.illustration} />
  }
  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.label}>I need</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: "flex-start",
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 140
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
