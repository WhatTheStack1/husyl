import React from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'

const vw = Dimensions.get("window").width

const Who = ({ navigation }) => {
    let refresh = true
    return (
        <ImageBackground
            source={require('../images/sean.jpg')}
            style={{ height: Dimensions.get("window").height }}
        >
            <View style={{paddingTop: 25}}>
                <Text
                    style={{ fontSize: 25, fontWeight: "bold", color: "white", textAlign: "center", marginTop: 15 }}
                >
                    WHO ARE YOU?
                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginBottom: 20 }}>

                <TouchableOpacity
                    onPress={() => navigation.navigate("JobGiver", { refresh: !refresh })}
                    style={{ flex: 0.22, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require("../images/drawable-hdpi/i2.png")}
                        style={{ height: "100%", width: vw / 1.1, opacity: 0.7, borderRadius: 20, backgroundColor: "#009C84" }}
                        resizeMode="cover"
                    />
                    <Text style={{ fontWeight: "bold", position: "absolute", fontSize: 16, color: "white" }}>JOB GIVER</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("JobSeeker", { refresh: true })}
                    style={{ flex: 0.22, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <Image
                        source={require("../images/drawable-hdpi/i1.png")}
                        style={{ height: "100%", width: vw / 1.1, opacity: 0.7, borderRadius: 20, backgroundColor: "#009C84" }}
                        resizeMode="cover"
                    />
                    <Text style={{ fontWeight: "bold", position: "absolute", fontSize: 16, color: "white" }}>JOB SEEKER</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate("JobSeeker", { screen: 'Home',name:"job_seeker" })}
                    style={{ flex: 0.22, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <Image
                        source={require("../images/drawable-hdpi/i1.png")}
                        style={{ height: "100%", width: vw / 1.1, opacity: 0.7, borderRadius: 20, backgroundColor: "#009C84" }}
                        resizeMode="cover"
                    />
                    <Text style={{ fontWeight: "bold", position: "absolute", fontSize: 16, color: "white" }}>JOB SEEKER</Text>
                </TouchableOpacity> */}

            </View>
        </ImageBackground>
    )
}

export default Who