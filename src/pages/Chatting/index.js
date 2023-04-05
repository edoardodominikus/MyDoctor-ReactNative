import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatItem, Header, InputChat } from "../../components";
import {
  colors,
  fonts,
  getChatDate,
  getChatTime,
  getData,
  showError,
} from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useEffect } from "react";
import { Firebase } from "../../config";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";

export default function Chatting({ navigation, route }) {
  const DataDoctor = route.params;
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  useEffect(() => {
    getDataUserLocal();
    getDataChatting();
  }, [getDataChatting, user.uid]);

  const getDataUserLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  const getDataChatting = () => {
    const chatId = `${user.uid}_${DataDoctor.data.uid}/`;
    const urlFirebase = "chatting/" + chatId + "allChat/";
    console.log(urlFirebase);
    const dbRef = ref(getDatabase(), urlFirebase);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        Object.keys(dataSnapshot).map((key) => {
          const dataChat = dataSnapshot[key];
          const newDataChat = [];
          Object.keys(dataChat).map((itemChat) => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: key,
            data: newDataChat,
          });
        });
        setChatData(allDataChat);
      }
    });
  };

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatId = `${user.uid}_${DataDoctor.data.uid}/`;
    const urlFirebase = "chatting/" + chatId + "allChat/" + getChatDate(today);
    const urlMessageUser = "messages/" + `${user.uid}/` + chatId;
    const urlMessageDoctor = "messages/" + `${DataDoctor.data.uid}/` + chatId;
    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: DataDoctor.data.uid,
    }
    const dataHistoryChatDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    }
    const db = getDatabase();
    push(ref(db, urlFirebase), data)
      .then((res) => {
        setChatContent("");
        set(ref(db, urlMessageUser), dataHistoryChatUser)
        set(ref(db, urlMessageDoctor), dataHistoryChatDoctor)
      })
      .catch((err) => {
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
          {chatData.map((chat) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat) => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe? null : {uri: DataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
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
