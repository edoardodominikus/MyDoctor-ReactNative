import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ILLOGO, ILGetStarted } from '../../assets/illustration';
import { Gap,Button } from '../../components/atoms';
import { colors,fonts } from '../../utils';
import { useSelector } from 'react-redux';
   

export default function GetStarted({navigation}) {
  const stateGlobal = useSelector(state => state.counter);

  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
        <View>
            <ILLOGO/>
            <Text style={styles.title}>Konsultasi dengan dokter jadi lebih mudah & fleksibel</Text>
        </View>
        <View>
            <Button title="Get Started" onPress={() => navigation.navigate('Register')}/>
            <Gap height={16}></Gap>
            <Button type="secondary" title="Sign In" onPress={()=> navigation.replace('Login')}/>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    page:{
        padding:40,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        flex: 1
    },
    title: {
        fontFamily: fonts.primary[600],
        fontSize: 28,
        color: colors.white,
        marginTop: 91,
    }
})