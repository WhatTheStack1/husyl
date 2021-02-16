import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, TextInput, Alert } from 'react-native'
import { Card } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
import { getMessages, sendMessage } from '../../functions/api';
import io from 'socket.io-client';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStorage from 'expo-secure-store'

// const SOCKET_URL = 'http://192.168.18.20:8000';
const SOCKET_URL = 'http://192.168.1.200:8000';


const Message = (props) => {
    const socket = io(SOCKET_URL);
    const [connection, setConnection] = useState(false)
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [placeholder, setPlaceHolder] = useState('Enter Your Message...')

    const fetchUser = async () => {
        setUser(JSON.parse(await SecureStorage.getItemAsync("user")))
    }

    const filterWords = [
        'fuck',
        'dog',
        'douche bag',
        'bastard',
        'pervert',
        'kevin',
        'keiren'
    ]

    const { chatId } = props.route.params;

    const fetchMessages = () => {
        getMessages(chatId)
            .then(
                (response) => {
                    setMessages(response.data.data)
                }
            )
    }

    useEffect(() => {
        fetchUser()
        fetchMessages()
    }, [])

    useEffect(async function () {
        Alert.alert(JSON.stringify(messages))
        const newMessages = [...messages]
        socket.on('newMessage', function (data) {
            fetchUser()
            fetchMessages()
            setMessage('')
        })
    }, [])


    const getFirstLetter = (firstName, lastName) => {
        const name = firstName.charAt(0) + lastName.charAt(0)
        return (name).toUpperCase()
    }
    const checkMessage = (event) => {
        let verfication = true
        const str = event.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
        filterWords.map(word => {
            if (str.includes(word)) {
                verfication = false
            }
        })
        if (!verfication) {
            setMessage('')
            setPlaceHolder('Vulgur and Personal Information (X)')
        } else {
            setMessage(event)
            setPlaceHolder('Enter Your Messages')
        }
    }

    const sendmessage = () => {
        // Alert.alert('In send message')
        const payload = {
            chatId: chatId,
            text: message,
            user: user._id
        }
        sendMessage(payload)
            .then(
                (response) => {
                    socket.emit('sendMessage', response.data.data)
                }
            )
            .catch(
                (error) => {
                    Alert.alert(JSON.stringify(error.response.data.message))
                }
            )
    }

    const renderMessage = ({ item }) => {
        return (
            <>
                {item.user ?
                    item.user._id !== user._id ?
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginVertical: 5, padding: 5 }}>
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
                                        {
                                            item.user ?
                                                getFirstLetter(item.user.firstName, item.user.lastName)
                                                :
                                                ''
                                        }
                                    </Text>
                                </View>
                                <View>
                                    <Card style={{ elevation: 5, borderRadius: 2, padding: 8, backgroundColor: '#009C84' }}>
                                        <Text style={{ color: 'white', fontSize: 15 }}>{item.text}</Text>
                                    </Card>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: "#a9a9a9", fontWeight: "bold" }}>
                                        {moment(item.createdAt).format('hh:mm a')}
                                    </Text>
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
                                        <Text style={{ color: 'white', fontSize: 15 }}>{item.text}</Text>
                                    </Card>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: "#a9a9a9", fontWeight: "bold" }}>
                                        {moment(item.createdAt).format('hh:mm a')}
                                    </Text>
                                </View>
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
                                        {
                                            item.user ?
                                                getFirstLetter(item.user.firstName, item.user.lastName)
                                                :
                                                ''
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                            </View>
                        </View>
                    :
                    <>
                    </>
                }
            </>

        )
    }

    return (
        <View style={{ paddingTop: 25 }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView
                >
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                    // extraData={selectedId}
                    />
                </ScrollView>
                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 2, marginTop: 5 }}>
                    <EvilIcons
                        name="envelope"
                        color="#a9a9a9"
                        size={22}
                        style={{ fontWeight: 'bolder', marginRight: 2, marginTop: 10, marginLeft: 10 }}
                    />
                    <TextInput
                        value={message}
                        placeholder={placeholder}
                        onChangeText={event => checkMessage(event)}
                    ></TextInput>
                    <TouchableOpacity
                        onPress={event => sendmessage()}
                    >
                        <Text style='right:1'>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Message