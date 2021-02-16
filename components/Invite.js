import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { Button } from 'react-native-paper'


const vh = Dimensions.get("window").height
const vw = Dimensions.get("window").width

const Invite = () => {
    return (
        <View style={{ paddingTop: 25 }}>
            <View style={{ backgroundColor: '#DCDCDC', paddingTop: 10 }}>
                <Card style={{ backgroundColor: 'white', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#a9a9a9' }}>INVITE FRIENDS</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', marginBottom: 10 }}>
                        <Button
                            mode="contained"
                            style={{ backgroundColor: '#009C84', width: vw / 1.3, borderRadius: 10 }}
                        >
                            <Text
                                style={{ color: 'white' }}>
                                Send Invitations
                            </Text>
                        </Button>
                    </View>
                </Card>
            </View>
        </View>
    )
}

export default Invite
