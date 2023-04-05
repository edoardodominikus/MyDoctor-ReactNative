import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { List } from "../../components";
import { colors, fonts, getData } from "../../utils";
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from "../../assets";
import { useEffect } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
  get,
  child
} from "firebase/database";

export default function Messages({navigation}) {
 const rootDB = ref(getDatabase());
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  useEffect(() => {
    getDataUserLocal();
    getDataChattingHistory();
  }, [getDataChattingHistory, user.uid]);

  const getDataUserLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };
  const getDataChattingHistory = () => {
    const urlFirebase ="messages/" + user.uid;
    console.log(urlFirebase);
    const dbRef = ref(getDatabase(), urlFirebase);
    onValue(dbRef, async(snapshot) => {
      if (snapshot.exists()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        const promises = await Object.keys(dataSnapshot).map(async(key) => {
          const urlUidDoctor = "doctors/" + `${dataSnapshot[key].uidPartner}`;
          const detailDoctor = await get(child(rootDB, urlUidDoctor));
          allDataChat.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...dataSnapshot[key]
          });
        });
        await Promise.all(promises);
      console.log("chat history: ",allDataChat);
      setHistoryChat(allDataChat);
      }
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map((chat) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          }
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress = {() => navigation.navigate("Chatting", dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
