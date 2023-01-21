import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header, Profile, ProfileItem } from '../../components/molecules'
import { Button, Gap } from '../../components/atoms'
import { colors } from '../../utils'

export default function DoctorProfile({navigation}) {
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()}/>
      <Profile name="Alexa Rachel" desc="Pediatrician" />
      <Gap height={10}/>
      <ProfileItem label="Alumnus" value="Universitas Indonesia, 2020"/>
      <ProfileItem label="Tempat Praktik" value="Rumah Sakit Umum, Bandung"/>
      <ProfileItem label="No. STR" value="0000116622081996"/>
      <View style={styles.action}>
        <Button title="Start Consultation" onPress={() => navigation.navigate("Chatting")}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  }
})