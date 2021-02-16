import { View, Text, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Realibility from '../../components/Realibility'
import Contact from '../../components/Contact'
import Email from '../../components/Email'
import OnBoard from '../../components/OnBoard'
import Invite from '../../components/Invite'
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';



const vh = Dimensions.get("window").height
const vw = Dimensions.get("window").width
const Profile = (props) => {
    const [value, setValue] = useState(null)
    const [idImage, setIDImage] = useState(null)

    const handleUpload = () => {
        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setIDImage(source)
            }
        });

    }


    return (
        <View style={{ paddingTop:  25}}>
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                {idImage && <Text>{idImage}</Text>}
                <View style={{ backgroundColor: 'white' }}>
                    <ScrollView>
                        <Header navigation={props.navigation} />
                        <View style={{ flex: 0.7, marginHorizontal: 15, marginTop: '10%' }}>
                            <Text
                                style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                About me </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: '200', color: '#a9a9a9', fontSize: 16, textAlign: 'justify' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Album</Text>
                                <Text style={{ color: '#009C84', fontSize: 16, fontWeight: 'bold' }}>View All</Text>
                            </View>
                            <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <ScrollView style={{ marginTop: 20, marginBottom: 10 }} horizontal={true}>
                                    <Image
                                        source={require("../../images/background.jpg")}
                                        style={styles.scrollimage}
                                    />
                                    <Image
                                        source={require("../../images/background.jpg")}
                                        style={styles.scrollimage}
                                    />
                                    <Image
                                        source={require("../../images/background.jpg")}
                                        style={styles.scrollimage}
                                    />
                                    <Image
                                        source={require("../../images/background.jpg")}
                                        style={styles.scrollimage}
                                    />
                                    <Image
                                        source={require("../../images/background.jpg")}
                                        style={styles.scrollimage}
                                    />
                                </ScrollView>
                            </View>

                            <View >
                                <Text style={{ marginBottom: 15, fontWeight: 'bold', fontSize: 20 }}>Apply for Verification</Text>
                            </View>
                            <DropDownPicker
                                items={[
                                    { label: 'Passport', value: 'pasport' },
                                    { label: 'SSL Number', value: 'ssl' },
                                    { label: 'ID Card', value: 'idCard' },
                                ]}
                                defaultValue={value}
                                containerStyle={{ height: 40, bottom: 10, width: '100%' }}
                                style={{ backgroundColor: '#fafafa', top: 2 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => setValue(item.value)}
                                placeholder="Select Verificaition Method"
                            />
                            {
                                value === 'idCard' ?
                                    <>

                                        <TouchableOpacity
                                            onPress={() => handleUpload()}
                                            style={[styles.viewOfInput, { flex: 1, alignItems: "center" }]}>
                                            <Text style={{ marginLeft: 7, fontSize: 16, color: "#bdbdbd" }}>upload ID Card</Text>
                                        </TouchableOpacity>
                                        <View style={[styles.viewOfInput, { flex: 1, alignItems: "center" }]}>
                                            <TextInput
                                                style={{ marginLeft: 5, fontSize: 16 }}
                                                placeholder='Enter ID Number..'></TextInput>
                                        </View>
                                    </>
                                    :
                                    null
                            }
                            {value === 'pasport' ?
                                <View style={[styles.viewOfInput, { flex: 1, alignItems: "center" }]}>
                                    <TextInput
                                        style={{ marginLeft: 5, fontSize: 16 }}
                                        placeholder='Enter Passport Number..'></TextInput>
                                </View>
                                : null
                            }
                            {value === 'ssl' ? <View style={[styles.viewOfInput, { flex: 1, alignItems: "center" }]}>

                                <TextInput
                                    style={{ marginLeft: 5, fontSize: 16 }}
                                    placeholder='Enter SSL Number..'></TextInput>
                            </View>
                                : null
                            }
                        </View>
                        <Realibility />
                        <Contact />
                        <Email />
                        <OnBoard />
                        <Invite />
                    </ScrollView>
                </View>
            </View>
        </View>

    )
}

const styles = {
    scrollimage: {
        height: 70,
        width: 70,
        marginLeft: 10,
        marginRight: 10
    },
    viewOfInput: {
        borderColor: '#bdbdbd',
        height: 40,
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: "row",
        width: '100%',
        marginBottom: 15
    }
}

export default Profile