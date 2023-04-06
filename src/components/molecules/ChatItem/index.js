import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Other from "./Other";
import IsMe from "./IsMe";
export default function ChatItem({isMe ,text, date, photo}) {
  if(isMe){
    return <IsMe text={text} date={date}/>
  }
  return <Other text={text} date={date} photo={photo} />
}

const styles = StyleSheet.create({

});
