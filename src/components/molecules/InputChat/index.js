import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

export default function InputChat({value, onChangeText, onPress}) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Write messages..." value={value} onChangeText={onChangeText}/>
      <Button disable={value.length < 1} type="btn-icon-send" onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.disable,
        padding: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        maxHeight: 45,
    },
    container:{
        padding: 16,
        flexDirection: 'row',
        backgroundColor: colors.white,
    }
})