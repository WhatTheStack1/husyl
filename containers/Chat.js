import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler';
import { Avatar, Badge } from 'react-native-paper';

import { getChats } from '../functions/api';


const Chat = ({ navigation }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        getChats()
            .then(
                (response) => {
                    setChats(response.data.data)
                }
            )
    }, [])

    const getFirstLetter = (firstName, lastName) => {
        const name = firstName.charAt(0) + lastName.charAt(0)
        return (name).toUpperCase()
    }



    const renderListITem = () => {
        return chats.map((chat, index) => {
            return (
                <View style={{ paddingTop: 25 }}>
                    <View key={index}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View

                                style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}>
                                <View
                                    style={{
                                        marginRight: 5,
                                        borderColor: 'green',
                                        borderWidth: 5,
                                        borderRadius: 50,
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'green',
                                            fontSize: 16,
                                            fontWeight: '700'
                                        }}
                                    >
                                        {getFirstLetter(chat.to.firstName, chat.to.lastName)}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Message', { chatId: chat._id })}
                                    style={{ flex: 1 }}>
                                    <View>
                                        <Text style={{ marginLeft: 7, marginTop: 10, fontWeight: 'bold' }}>Family</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ marginLeft: 7, marginTop: 3, color: "#a9a9a9" }}>Get back to you later</Text>
                                        <View style={{ alignItems: 'flex-end', justifyContent: "flex-start", flex: 1, paddingHorizontal: 10 }}>
                                            <Badge
                                                style={{ color: "white", backgroundColor: "#009c84" }}
                                            >1</Badge>
                                            {/* <Text style={{ fontSize: 10, color: "#a9a9a9" }}>12 june 2020</Text> */}

                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, marginTop: 5 }} />
                    </View>
                </View>
            )
        }
        )
    }
    return (
        <ScrollView>
            {renderListITem()}
        </ScrollView>
    )
}

export default Chat