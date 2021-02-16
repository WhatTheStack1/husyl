import React, { useState } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker';

import * as Location from 'expo-location';
import { SafeAreaView } from 'react-navigation';

import { addJobGiver, setUser } from '../../functions/api';

const vw = Dimensions.get("window").width

const JobGiver = (props) => {
    const [giverType, setGiverType] = React.useState('company');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')


    const addGiverDetail = async (event) => {
        event.preventDefault()
        const location = await addLocation()
        const payload = {
            giverType: giverType,
            name: name,
            description: description,
            location: location,
        }
        addJobGiver(payload)
            .then(
                (response) => {
                    setUser(response.data.data)
                    props.navigation.navigate("MyJobs")
                }
            )
            .catch(
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }

    const addLocation = async () => {
        // console.log('in location')
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        const locationObject = {
            type: 'Point',
            coordinates: {
                longitude: loc.coords.longitude,
                latitude: loc.coords.latitude
            },
            address: address
        }
        return locationObject
    }

    const renderCompanyForm = () => {
        return (
            <>
                <Text style={styles.text}>Company Name</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter Company Name"
                        onChangeText={event => {
                            setName(event)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            </>
        )
    }
    const renderIndividualForm = () => {
        return (
            <>
                <Text style={styles.text}>Name</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter Your Name"
                        onChangeText={event => {
                            setName(event)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            </>
        )
    }

    return (
        <ImageBackground
            source={require("../../images/drawable-hdpi/Image24.png")}
            style={{ flex: 1, width: vw, backgroundColor: "#009C84" }}
        >
            <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
            {/* <EvilIcons
                name="close"
                onPress={()=>props.navigation.navigate("Filter",{screen:"Filter"})}
                color="white"
                size={22}
                style={{ fontWeight: 'bolder', marginRight: 2, marginTop: 15, marginLeft: 10 }}
            /> */}

            <ScrollView style={{ paddingHorizontal: 25, paddingVertical: 7, marginHorizontal: 10, marginTop: 2 }}>
                <KeyboardAvoidingView >
                    <Text style={styles.text}>Choose Your Title</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <Picker
                            selectedValue={giverType}
                            style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setGiverType(itemValue)
                            }
                        >
                            <Picker.Item label="Company" value="company" />
                            <Picker.Item label="Individual" value="individual" />
                        </Picker>
                    </View>
                    {
                        giverType === 'company' ? renderCompanyForm() : renderIndividualForm()
                    }
                    <Text style={styles.text}>Description</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Type all details here"
                            onChangeText={event => {
                                setDescription(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>
                    <Text style={styles.text}>Location</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            placeholder="Enter Job address"
                            style={{paddingLeft: 10}}
                            onChangeText={event => {
                                setAddress(event)
                            }}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity
                        onPress={event => addGiverDetail(event) }
                        style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                        <Text style={{ fontSize: 18, color: 'white' }} >Add Giver Detail</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView >
            </ScrollView>
        </SafeAreaView>
        
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 3
    }

});

export default JobGiver