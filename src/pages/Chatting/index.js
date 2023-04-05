import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatItem, Header, InputChat } from "../../components";
import { colors, fonts, getData, showError } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useEffect } from "react";
import { Firebase } from "../../config";
import { getDatabase, push, ref, set, update } from "firebase/database";

export default function Chatting({ navigation, route }) {
  const DataDoctor = route.params;
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    getData("user").then((res) => {
      // console.log("current user: ", res);
      setUser(res);
    });
  }, []);
  const chatSend = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: `${hour}:${minutes} ${hour > 12 ? "PM" : "AM"}`,
      chatContent: chatContent,
    };
    console.log("send chat data: ", data);
    const db = getDatabase();
    push(
      ref(
        db,
        "chatting/" +
          `${user.uid}_${DataDoctor.data.uid}/` +
          "allChat/" +
          `${year}-${month}-${date}`
      ),
      data
    ).then((res) => {
      console.log("chat send success");
      setChatContent("");
    }).catch(err => {
      showError(err.message);
    });

  };

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={DataDoctor.data.fullName}
        desc={DataDoctor.data.category}
        photo={{ uri: DataDoctor.data.photo }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Monday, 25 March 2023</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem />
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onPress={() => chatSend()}
      />
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
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
});
