import React, { useEffect, useState } from 'react'
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
    Alert,
} from 'react-native'
import {
    Card
} from 'react-native-paper';
import { SocialIcon, Icon } from 'react-native-elements'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../../components/NavigationHeader'
import { login, setConfigurations, setUser } from '../../functions/api'

import * as SecureStore from 'expo-secure-store'

const Login = (props) => {
    let refresh = true;
    const checkSession = async () => {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            setConfigurations()
            const user = JSON.parse(await SecureStore.getItemAsync('user'))
            if (user.jobSeeker) {
                props.navigation.navigate("Home")
            } else if (user.jobGiver) {
                props.navigation.navigate("MyJobs")
            } else {
                props.navigation.navigate("Who")
            }
        } else {
            return
        }
    }
    useEffect(() => {
        checkSession()
    }, [refresh])

    const [checkbox, setCheckbox] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (event) => {
        event.preventDefault()
        const payload = {
            email: email,
            password: password
        }
        login(payload)
            .then(
                (response) => {
                    setUser(response.data.data)
                    if (response.data.data.jobSeeker) {
                        props.navigation.navigate("Home", { refresh: true })
                    } else if (response.data.data.jobGiver) {
                        props.navigation.navigate("MyJobs")
                    }else {
                        props.navigation.navigate("Who")
                    }
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
            <View style={{ paddingTop: 25 }}>
                <NavigationHeader heading="Login To Account" navigation={props.navigation} navigateTo="" color="black" />

                <ScrollView style={{ margin: 50, marginHorizontal: 20 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        <Card style={{ flex: 1 }} >
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 30, fontWeight: '600', marginTop: 25 }}>Login</Text>
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
                                <Text style={{ color: '#bdbdbd', fontSize: 20, marginTop: 15, marginBottom: 15, fontWeight: 'bold' }} >to be professional</Text>

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
                                        style={{ fontSize: 14 }}
                                        placeholder='User Name/Email...'
                                        onChangeText={
                                            event => {
                                                setEmail(event)
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
                                        secureTextEntry={true}
                                        style={{ fontSize: 14 }}
                                        placeholder='Password'
                                        onChangeText={
                                            event => {
                                                setPassword(event)
                                            }
                                        }
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 22, flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate("SignUp")}
                                    ><Text style={{ fontWeight: 'bold', fontSize: 14 }}>SignUp</Text></TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '700' }}>Forgot Password</Text>
                            </View>
                            <View style={{ flex: 1, margin: 30, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={event => onLogin(event)}
                                    style={{ backgroundColor: '#009C84', paddingHorizontal: 60, paddingVertical: 10, borderRadius: 30 }}>
                                    <Text style={{ textAlign: "center", fontSize: 18, color: 'white' }} >LOGIN</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity 
                                onPress={()=>props.navigation.navigate("Home")}
                                    style={{ width:"90%", marginTop:10, backgroundColor: '#009C84', paddingHorizontal: 60, paddingVertical: 10, borderRadius: 30 }}>
                                    <Text style={{ fontSize: 18, color: 'white',textAlign:"center" }} >LOGIN AS GUEST</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Home")}
                                >
                                    <Text style={{ marginTop: 5, fontSize: 14 }}>Login As Guest</Text>
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