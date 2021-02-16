import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native'
import { Card } from 'react-native-paper';
import { SocialIcon, Icon } from 'react-native-elements'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'

import { signup } from '../../functions/api';


const SignUp = (props) => {
    const [checkbox, setCheckbox] = useState(false)
    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [password, setPassword] = useState('')

    const onSignup = (event) => {
        event.preventDefault()
        const payload = {
            userName: userName.toString(),
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            email: email.toString(),
            password: password.toString()
            // password: password
        }
        signup(payload)
            .then(
                (response) => {
                    props.navigation.navigate('Who')
                },
                (error) => {
                    Alert.alert(JSON.stringify(error.response.data))
                }
            )
    }

    return (
        <ImageBackground
            source={require("../../images/register-bg.png")}
            style={{ flex: 1, backgroundColor: '#efebe9' }}
        >
            <View style={{ paddingTop: 25 }}>
                {/* <NavigationHeader
                    color="black"
                    heading="Create Account"
                    navigation={props.navigation}
                    navigateTo="Login"
                /> */}

                <ScrollView style={{ margin: 50, marginHorizontal: 20 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        <Card style={{ flex: 1 }} >
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 30, fontWeight: '600', marginTop: 25 }}>Register</Text>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: "row", marginTop: 15
                                }}>
                                    <TouchableOpacity>
                                        <SocialIcon
                                            type='twitter'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "#db311f", padding: 11, borderRadius: 50 }}>
                                        <Image
                                            source={require("../../images/google.png")}
                                            style={{ height: 30, width: 30 }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <SocialIcon
                                            type='facebook'
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: '#bdbdbd', fontSize: 20, marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>to be professional</Text>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 0, marginTop: 0 }}>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <EvilIcons
                                        name="user"
                                        color="#a9a9a9"
                                        size={22}
                                        style={{ fontWeight: 'bolder', marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput
                                        placeholder='User Name...'
                                        onChangeText={event => {
                                            setUserName(event)
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="format-text"
                                        color="#DCDCDC"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 10, marginLeft: 10, fontWeight: 'bold' }}
                                    />
                                    <TextInput
                                        placeholder='First Name...'
                                        onChangeText={event => {
                                            setFirstName(event)
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="format-text"
                                        color="#bdbdbd"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput
                                        placeholder='Last Name...'
                                        onChangeText={event => {
                                            setLastName(event)
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="email-outline"
                                        color="#bdbdbd"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput
                                        placeholder='Your Email...'
                                        onChangeText={event => {
                                            setEmail(event)
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="lock-outline"
                                        color="#bdbdbd"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='Your Password...'
                                        type="password"
                                        onChangeText={event => {
                                            setPassword(event)
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={{ height: 40, borderColor: '#bdbdbd', borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="phone"
                                        color="#bdbdbd"
                                        size={18}
                                        style={{ marginRight: 2, marginTop: 10, marginLeft: 10 }}
                                    />
                                    <TextInput placeholder='Mobile Number...'></TextInput>
                                </View>
                                <View style={{ height: 40, borderColor: '#bdbdbd', borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <MaterialCommunityIcons
                                        name="alpha-z"
                                        color="#bdbdbd"
                                        size={20}
                                        style={{ marginRight: 2, marginTop: 8, marginLeft: 10 }}
                                    />
                                    <TextInput placeholder='Zip Code...'></TextInput>
                                </View>
                                <View style={{ flexDirection: "row", }}>
                                    <CheckBox
                                        checkBoxColor="#a9a9a9"
                                        checkedCheckBoxColor="green"
                                        isChecked={checkbox}
                                        onClick={() => setCheckbox(!checkbox)}
                                    />
                                    <Text
                                        style={{ fontWeight: '600', textAlign: 'center', marginTop: 2, marginLeft: 2 }}
                                    >I agree to the terms and conditions</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, margin: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={event => onSignup(event)}
                                    style={{ backgroundColor: '#009C84', paddingHorizontal: 80, paddingVertical: 10, borderRadius: 30 }}>
                                    <Text style={{ fontSize: 18, color: 'white' }} >NEXT</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default SignUp