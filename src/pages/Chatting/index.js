import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatItem, Header, InputChat } from "../../components";
import { colors, fonts } from "../../utils";

export default function Chatting({navigation}) {
  return (
    <View style={styles.page}>
      <Header type="dark-profile" title="Alexandra Jennie" onPress={() => navigation.goBack()}/>
      <View style={styles.content}>
        <Text style={styles.chatDate}>Monday, 25 March 2023</Text>
        <ChatItem isMe/>
        <ChatItem />
        <ChatItem />
      </View>
      <InputChat />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
  },
  content: {
    flex: 1,
  },
});
