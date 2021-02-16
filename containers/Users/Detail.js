import React, { useState } from 'react'
import { View, Dimensions, Text, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ImageBackground } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

import { Switch } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';

const vh = Dimensions.get("window").height

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const UserDetail = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [language, setLanguages] = React.useState('java');
    const [image, setImage] = useState([])

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleImageSelect = () => {


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setImage(response.data)
            }
        });
    }
    return (
        <View style={{ paddingTop: 25 }}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Card style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleImageSelect}>
                                {image.length === 0 ?
                                    <Image
                                        source={require("../../images/default_image.png")}
                                        style={{ height: 121, width: 124, borderRadius: 100 }}
                                    />
                                    :
                                    <Image source={{ uri: 'data:image/jpeg;base64,' + image }}
                                        style={{ height: 121, width: 124, borderRadius: 100 }}
                                    />
                                }

                            </TouchableOpacity>
                            <Text style={{ flex: 0.8, color: "#AFAFAF", fontSize: 16 }}>Enter your profile photo</Text>
                        </View>

                        <View style={{ flex: 1, marginTop: 20, flexDirection: 'column', marginHorizontal: 30 }}>
                            <View >
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 9 }}>Choose Option to HUSYL</Text>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, marginTop: 5, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <Picker

                                        selectedValue={language}
                                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setLanguages(itemValue)
                                        }
                                    >
                                        <Picker.Item label="Regular/Job seeker/Job giver" value="java" />
                                        <Picker.Item label="Job Seeker" value="js" />
                                    </Picker>
                                </View>
                            </View>
                            <View >
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 9 }}>Choose Job Prefference</Text>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, marginTop: 5, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                                    <Picker

                                        selectedValue={language}
                                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setLanguages(itemValue)
                                        }
                                    >
                                        <Picker.Item label="Regular" value="java" />
                                        <Picker.Item label="Special" value="js" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: 9 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Other work opportunities</Text>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ color: "#AFAFAF", fontSize: 12 }}>  I am open to long term contacts</Text>
                                    {/* <Text style={{ color: "#AFAFAF", fontSize: 12 }}>  I am open to long term contacts</Text> */}
                                    <View style={{ flex: 1 }}>
                                        <Switch
                                            color="#009C84"
                                            style={{
                                                transform: [{ scaleX: 1.0 }, { scaleY: 1.4 }],
                                                marginTop: -5
                                            }}
                                            value={isSwitchOn}
                                            onValueChange={onToggleSwitch} />
                                    </View>
                                </View>
                            </View>



                            <View style={{ marginTop: 10, marginLeft: 9 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter Your Location</Text>
                                <View style={{ marginTop: 5, borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>

                                    <TextInput placeholder='Regular'
                                        style={{ marginLeft: 5, fontSize: 16 }}></TextInput>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, marginLeft: 9 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Contact Number</Text>
                                <View style={{ borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>

                                    <TextInput
                                        style={{ marginLeft: 5, fontSize: 16 }}
                                        placeholder='Regular'></TextInput>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, marginLeft: 9 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Estimated Payment Scale</Text>
                                <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ color: "#AFAFAF", fontSize: 13, flex: 1 }}>  Minimum $</Text>
                                    <Picker

                                        selectedValue={language}
                                        style={{ height: 20, width: 70, flex: 1, color: 'white', backgroundColor: "#707070" }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setLanguages(itemValue)
                                        }
                                    >
                                        <Picker.Item label="20" value="java" />
                                        <Picker.Item label="10" value="js" />
                                    </Picker>
                                    <Text style={{ color: "#AFAFAF", fontSize: 13, flex: 1 }}>Maximum$</Text>
                                    <Picker
                                        selectedValue={language}
                                        style={{ height: 20, width: 70, flex: 1, backgroundColor: "#707070", color: "white" }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setLanguages(itemValue)
                                        }
                                    >
                                        <Picker.Item label="20" value="java" />
                                        <Picker.Item label="10" value="js" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, marginLeft: 9 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter your bio details</Text>
                                <View style={{ marginTop: 5, height: 133, borderColor: '#bdbdbd', borderWidth: 1, borderRadius: 10, marginBottom: 1 }}>
                                    <TextInput

                                        multiline={true} numberOfLines={4}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, margin: 13, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("Home")}
                                style={{ backgroundColor: '#009C84', paddingBottom: 10, paddingTop: 10, borderRadius: 30, width: "86%" }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', alignItems: 'stretch', flex: 1 }} >APPLY</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </KeyboardAvoidingView>
            </ScrollView >
        </View>

    )
}
export default UserDetail
