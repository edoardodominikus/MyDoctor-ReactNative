import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header, Profile, ProfileItem } from '../../components/molecules'
import { Button, Gap } from '../../components/atoms'
import { colors } from '../../utils'

export default function DoctorProfile({navigation, route}) {
  const DoctorData = route.params;
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()}/>
      <Profile name={DoctorData.data.fullName} desc={DoctorData.data.profession} photo={{uri:DoctorData.data.photo}}/>
      <Gap height={10}/>
      <ProfileItem label="Alumnus" value={DoctorData.data.university}/>
      <ProfileItem label="Tempat Praktik" value={DoctorData.data.hospital_address}/>
      <ProfileItem label="No. STR" value={DoctorData.data.str_number}/>
      <View style={styles.action}>
        <Button title="Start Consultation" onPress={() => navigation.navigate("Chatting", DoctorData)}/>
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