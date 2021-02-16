import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { EvilIcons, Ionicons, FontAwesome5, Octicons, AntDesign, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { logoutOfDevice } from '../functions/api';

class DrawerItem extends React.Component {

    renderIcon = () => {
        const { title, focused } = this.props;
        // alert(focused)
        switch (title) {
            case "Home":
                return (
                    <MaterialCommunityIcons
                        name="home-outline"
                        color={focused ? "#009C84" : "white"}
                        size={25}
                    />
                );
            case "Profile":
                return (
                    <EvilIcons
                    name="user"
                    color={focused ?  "#009C84" : "white"}
                    size={25} 
                    />
                );

            case "Inbox":
                return (
                    <Feather
                        name="message-square"
                        color={focused ? "#009C84" : "white"}
                        size={22}
                    />
                );

            case "Find Jobs":
                return (
                    <Ionicons
                        name="md-search-outline"
                        color={focused ? "#009C84" : "white"}
                        size={23}
                    />
                );
            case "Payment":
                return (
                    <FontAwesome5
                        name="money-bill-wave"
                        color={focused ? "#009C84" : "white"}
                        size={20}
                    />
                );
            case "Invite Friends To Earn!":
                return (
                    <Octicons
                        name="gift"
                        color={focused ? "#009C84" : "white"}
                        size={24}
                    />
                );
            case "Suggest Improvements":
                return (
                    <Foundation
                        name="clipboard-notes"
                        color={focused ? "#009C84" : "white"}
                        size={25}
                    />
                );
            case "FAQ":
                return (
                    <AntDesign
                        name="questioncircleo"
                        color={focused ? "009C84" : "white"}
                        size={22}
                    />
                );
            case "Log Out":
                return (
                    <MaterialCommunityIcons
                        name="exit-to-app"
                        color={focused ? "#009C84" : "white"}
                        size={25}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        const { focused, title, navigation, props } = this.props;

        return (
            <TouchableOpacity
                style={{ height: 50 }}
                onPress={() => {
                    if (title === "Log Out") {
                        logoutOfDevice()
                        navigation.navigate("Login")
                    }
                    else if (title === "Inbox") {
                        navigation.navigate("Message")
                    }
                    else {
                        navigation.navigate(title)
                    }
                }}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={[(focused) ? styles.viewActive : styles.viewInActive]}>
                        {this.renderIcon()}
                        <Text
                            style={[(focused) ? styles.activeStyle : styles.inactive]}
                        >
                            {title}
                        </Text>
                    </View>

                </View>


            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    inactive: {
        color: 'white',
        marginTop: 2,
        marginLeft: 10
    },

    activeIcon: {
        color: "#009C84",
        height: 15,
        width: 15
    },
    inActiveIcon: {
        color: "white",
        height: 15,
        width: 15
    },

    activeStyle: {
        borderRadius: 30,
        marginTop: 2,
        color: "#009C84",
        marginLeft: 10
    },
    viewActive: {
        flexDirection: 'row',
        alignContent: 'stretch',
        backgroundColor: 'white',
        flex: 1,
        height: 40,
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 15,
        marginHorizontal: 10,
        width: '90%'
    },
    viewInActive: {
        flexDirection: 'row',
        alignContent: 'stretch',
        flex: 1,
        height: 40,
        alignItems: 'center',
        width: '90%',
        paddingLeft: 15,
        marginHorizontal: 10
    }

});

export default DrawerItem;