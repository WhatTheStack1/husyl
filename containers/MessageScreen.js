import React from 'react'
import { View, Text, ScrollView, FlatList, TextInput } from 'react-native'
import { Avatar, Badge, Card } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';


const Message = (props) => {

    const data = [
        {
            message: 'Hey there! how are you today?',
            source: 'incoming',
            id: 1
        },
        {
            message: 'this is sample text',
            source: 'outgoing',
            id: 2
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 3
        },
        {
            message: 'this is sample text',
            source: 'outgoing',
            id: 4
        },
        {
            message: 'this is sample text',
            source: 'outgoing',
            id: 5
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 6
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 7
        },
        {
            message: 'this is sample text',
            source: 'outgoing',
            id: 8
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 9
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 10
        },
        {
            message: 'this is sample text',
            source: 'incoming',
            id: 11
        },
        {
            message: 'this is sample text',
            source: 'outgoing',
            id: 12
        },
    ]

    const renderMessage = ({ item }) => {
        return (
            <>
                {
                    item.source === 'incoming' ?
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginVertical: 5, padding: 5 }}>
                                <Avatar.Image style={{ marginRight: 5, top: -2 }} size={42} source={require('../images/avatar.jpg')} />
                                <View>
                                    <Card style={{ elevation: 5, justifyContent: "center", borderRadius: 2, padding: 8 }}>
                                        <Text style={{ textAlign: "justify" }}>{item.message}</Text>
                                    </Card>
                                    <Text style={{ fontSize: 12, color: "#a9a9a9", fontWeight: "bold" }}>12:35PM</Text>

                                </View>

                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'center' }}>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginVertical: 5 }}>
                                <View>
                                    <Card style={{ elevation: 5, borderRadius: 2, padding: 8, backgroundColor: '#009C84' }}>
                                        <Text style={{ color: 'white', fontSize: 15 }}>{item.message}</Text>
                                    </Card>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: "#a9a9a9", fontWeight: "bold" }}>12:35PM</Text>

                                </View>

                                <Avatar.Image style={{ marginLeft: 5, top: -2 }} size={42} source={require('../images/avatar.jpg')} />
                            </View>
                            <View style={{ flex: 1 }}>
                            </View>
                        </View>
                }
            </>

        )
    }

    return (
        <View style={{ paddingTop: 25 }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <FlatList
                    data={data}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                // extraData={selectedId}
                />
                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 2, marginTop: 5 }}>
                    <EvilIcons
                        name="envelope"
                        color="#a9a9a9"
                        size={22}
                        style={{ fontWeight: 'bolder', marginRight: 2, marginTop: 10, marginLeft: 10 }}
                    />
                    <TextInput placeholder='Enter Your Message..'></TextInput>
                </View>
            </View>
        </View>
    )
}

export default Message