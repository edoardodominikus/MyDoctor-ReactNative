import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Other from "./Other";
import IsMe from "./isMe";
export default function ChatItem({isMe}) {
  if(isMe){
    return <IsMe />
  }
  return <Other />
}

const styles = StyleSheet.create({

});
