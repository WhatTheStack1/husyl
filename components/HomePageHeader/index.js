import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationHeader from '../NavigationHeader/index'





const HomePageHeader = (props) => {
    return (
        <View style={{ paddingTop: 25 }}>
            <View style={{ backgroundColor: 'white' }}>
                <NavigationHeader
                    heading={props.title}
                    drawerProps={props.navprops}
                    navigation={props.navigation}
                    navigateTo=""
                    color="black"
                    icon="three-bars"
                />
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{
                        borderColor: '#bdbdbd',
                        marginLeft: 10,
                        marginRight: 10,
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 30,
                        flexDirection: "row",
                        marginBottom: 15,
                        marginTop: 25,
                        width: '80%'
                    }}>

                        <TextInput
                            style={{ fontSize: 14, marginLeft: 15, flex: 0.7 }}
                            placeholder='What Are you looking for?'
                            placeholderTextColor="#DCDCDC"
                        >
                        </TextInput>
                        <View style={{ flex: 0.3, alignItems: 'flex-end', marginRight: 10 }}>
                            <EvilIcons
                                name="search"
                                color="black"
                                size={25}
                                style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => props.navprops.navigate("Filter", { 'screen': props?.screenName })}
                        style={{
                            // marginRight: '2%',
                            marginTop: 25,
                            width: '15%',
                            // backgroundColor: '#009C84',
                            paddingVertical: 7,
                            borderRadius: 30,
                            height: 40,
                            alignItems: 'center'
                        }}>
                        <Image
                            source={require("../../images/settings.png")}
                            style={{ height: 23, width: 23 }}
                        />
                    </TouchableOpacity>
                </View>

                {props.head1 === "Available" ?
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', padding: 10, paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 25, }}>
                            <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                color="black"
                                size={25}
                                style={{ marginRight: 5, marginTop: 5, fontWeight: 'bold' }}
                            />
                            <Text style={{ marginRight: 2, marginTop: 8, fontSize: 18 }}>{props.head1}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 30, }}>
                            <MaterialCommunityIcons
                                name="home-minus-outline"
                                color="black"
                                size={25}
                                style={{ marginRight: 2, marginTop: 8, fontWeight: 'bold' }}
                            />
                            <Text style={{ marginTop: 8, fontSize: 18 }}>{props.head2}</Text>

                        </View>
                    </View>
                    :
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', padding: 10, paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 25, }}>
                            <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                color="black"
                                size={25}
                                style={{ marginRight: 5, marginTop: 5, fontWeight: 'bold' }}
                            />
                            <Text style={{ marginRight: 2, marginTop: 8, fontSize: 18 }}>{props.head1}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 30, }}>
                            <MaterialCommunityIcons
                                name="home-minus-outline"
                                color="black"
                                size={25}
                                style={{ marginRight: 2, marginTop: 8, fontWeight: 'bold' }}
                            />
                            <Text style={{ marginTop: 8, fontSize: 18 }}>{props.head2}</Text>

                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default HomePageHeader