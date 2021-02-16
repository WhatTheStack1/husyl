import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { getChats } from '../../functions/api';

const ChatList = (props) => {

  useEffect(() => {
    onConnectSocket()
    getChats()
      .then(
        (response) => {
          setChats(response.data.data)
        }
      )
  })


  return (
    <View style={{ paddingTop: 25 }}>
      <View style={styles.container}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default ChatList
