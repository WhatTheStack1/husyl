import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker';


import { createApplication, getJob } from '../../functions/api';

const vw = Dimensions.get("window").width
const vh = Dimensions.get("window").height

const AddApplication = (props) => {
    const { id } = props.route.params;
    const [job, setJob] = useState({});
    const [requirements, setRequirements] = useState([])

    useEffect(() => {
        getJob(id)
            .then(
                (response) => {
                    setJob(response.data.data)
                }
            )
    }, [id])

    const addApplication = async (event) => {
        event.preventDefault()
        const payload = {
            job: id,
            requirements: requirements,
        }
        createApplication(payload)
            .then(
                (response) => {
                    props.navigation.navigate("JobDetails", { id: id })
                }
            )
            .catch(
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }

    const addRequirement = () => {
        const req = [...requirements]
        req.push('')
        setRequirements(req)
    }
    const onChangeRequirement = (event, index) => {
        const req = [...requirements]
        req[index] = event
        setRequirements(req)
    }

    const renderRequirements = () => {
        return requirements.map((requirement, index) => {
            return (

                <View key={index} style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <Picker
                        selectedValue={requirement}
                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                        onValueChange={(itemValue, itemIndex) =>
                            onChangeRequirement(itemValue, index)
                        }
                    >
                        <Picker.Item label="" value="" />
                        {
                            job.requirements.map((req, reqIndex) =>
                                <Picker.Item key={reqIndex} label={req} value={req} />
                            )
                        }
                    </Picker>
                </View>
            )
        }
        )
    }

    return (
        <>
            <ImageBackground
                source={require("../../images/drawable-hdpi/Image24.png")}
                style={{ flex: 1, width: vw, backgroundColor: "#009C84" }}
            >
                <View style={{ paddingTop: 25 }}>
                    <ScrollView style={{
                        paddingHorizontal: 25,
                        paddingVertical: 7,
                        marginHorizontal: 10,
                        marginTop: Platform.OS === 'android' ? 40 : 0
                    }}>
                        <KeyboardAvoidingView style={{ alignItems: 'center' }}>
                            <Text style={[styles.text, { alignSelf: 'flex-start' }]}>Select your requirments</Text>
                            {renderRequirements()}
                            <TouchableOpacity
                                onPress={event => addRequirement()}
                                style={{ backgroundColor: '#009C84', width: '60%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginBottom: 30 }}>
                                <Text style={{ fontSize: 18, color: 'white' }} >+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={event => addApplication(event)}
                                style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginBottom: 30 }}>
                                <Text style={{ fontSize: 18, color: 'white' }} >Apply</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView >
                    </ScrollView>
                </View>
            </ImageBackground>
        </>
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

export default AddApplication