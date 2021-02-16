import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
// import { DrawerContentScrollView } from 'react-navigation-drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import DrawerItems from './Custom'


function DrawerContent(props) {

    const renderNav = [
        "Home",
        "Profile",
        "Inbox",
        "Find Jobs",
        "Payment",
        "Invite Friends To Earn!"
    ];

    return (
        <View>
            <View style={{ minHeight: '100%', backgroundColor: '#009C84' }}>
                <DrawerContentScrollView {...props} >
                    <View style={styles.drawerContent}>
                        <View style={{ marginTop: 25 }} >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: 15, padding: 5, borderWidth: 1, borderRadius: 50, backgroundColor: 'white', borderColor: 'white' }}>
                                    <Image
                                        source={require("../images/logo.png")}
                                        style={{ height: 45, width: 45 }}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', marginLeft: 5, fontSize: 20, fontWeight: '600' }}>HUSYL</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => props.navigation.closeDrawer()}
                                    style={{ flex: 1, marginRight: 20, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Image

                                        source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                                        style={{ width: 25, height: 25, marginLeft: 5 }}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={{ marginTop: 30 }}>
                            {renderNav.map((item, index) => {
                                return (
                                    <DrawerItems
                                        title={item}
                                        key={index}
                                        navigation={props.navigation}
                                        focused={props.state.index === index ? true : false}
                                        props={props}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View
                        style={{ marginTop: 20, borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 12, borderColor: "white" }}
                    />
                    <View style={{ marginTop: 10 }}>
                        <DrawerItems title="Suggest Improvements" navigation={props.navigation} />
                        <DrawerItems title="FAQ" navigation={props.navigation} />
                        <DrawerItems title="Log Out" navigation={props.navigation} />
                    </View>
                </DrawerContentScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    underline: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white"
    },
    userInfoScreen: {
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    prefence: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})

export default DrawerContent






