import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native'
import {
    Card
} from 'react-native-paper';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { openJobPosting } from '../../functions/api'
import * as SecureStore from 'expo-secure-store'

const Login = (props) => {

    const [accountNumber, setAccountNumber] = useState('')
    const [expiryMonth, setExpiryMonth] = useState(0)
    const [expiryYear, setExpiryYear] = useState(0)
    const [cvc, setCVC] = useState('')

    const onPay = (event) => {
        event.preventDefault()
        const payload = {
            number: accountNumber,
            exp_month: parseInt(expiryMonth),
            exp_year: parseInt(expiryYear),
            cvc: cvc
        }
        openJobPosting(payload)
            .then(
                async (response) => {
                    await SecureStore.setItemAsync('user', JSON.stringify(response.data.data))
                    props.navigation.navigate("MyJobs")
                },
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }
    return (
        <ImageBackground
            source={require("../../images/register-bg.png")}
            style={{ flex: 1, backgroundColor: '#efebe9' }}>
            <View style={{ paddingTop: 100 }}>
                <ScrollView style={{ margin: 50, marginHorizontal: 20 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        <Card style={{ flex: 1 }} >
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 30, marginTop: 0 }}>
                                <Text style={{fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 20}}>
                                    Pay $20 to start with Posting jobs
                                </Text>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <EvilIcons
                                        name="user"
                                        color="#a9a9a9"
                                        size={22}
                                        style={{ fontWeight: 'bolder', marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput 
                                        placeholder='Enter 16 digit Account Number'
                                        onChangeText={
                                            event => {
                                                setAccountNumber(event)
                                            }
                                        }
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <Ionicons
                                        name="lock-closed-sharp"
                                        color="#DCDCDC"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                                    />
                                    <TextInput
                                        style={{ fontSize: 14 }}
                                        placeholder='Enter Expiry Month'
                                        onChangeText={
                                            event => {
                                                setExpiryMonth(event)
                                            }
                                        }
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <Ionicons
                                        name="lock-closed-sharp"
                                        color="#DCDCDC"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                                    />
                                    <TextInput
                                        style={{ fontSize: 14 }}
                                        placeholder='Enter Expiry Year'
                                        onChangeText={
                                            event => {
                                                setExpiryYear(event)
                                            }
                                        }
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <Ionicons
                                        name="lock-closed-sharp"
                                        color="#DCDCDC"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                                    />
                                    <TextInput
                                        style={{ fontSize: 14 }}
                                        placeholder='Enter 3 digit CVC'
                                        onChangeText={
                                            event => {
                                                setCVC(event)
                                            }
                                        }
                                    ></TextInput>
                                </View>


                            </View>
                            <View style={{ flex: 1, margin: 30, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={event => onPay(event)}
                                    style={{ backgroundColor: '#009C84', paddingHorizontal: 60, paddingVertical: 10, borderRadius: 30 }}>
                                    <Text style={{ textAlign: "center", fontSize: 18, color: 'white' }} >PAY $20.0</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Login