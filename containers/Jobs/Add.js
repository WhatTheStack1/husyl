import React, { useState } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-navigation';

import { createJob } from '../../functions/api'; 

const vw = Dimensions.get("window").width

const JobGiver = (props) => {
    const [giverType, setGiverType] = React.useState('company');
    const [jobType, setJobType] = React.useState('Full Time');
    const [jobTitle, setJObTitle] = React.useState('');
    const [payRole, setPayRole] = React.useState('hourly');
    const [range, setRange] = React.useState('Range');

    const [show, setShowDateTimePicker] = useState(false)
    const [date, setDate] = useState(new Date());
    
    const [companyName, setCompanyName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [lowerWage, setLowerWage] = useState(0)
    const [upperWage, setUpperWage] = useState(0)
    const [estimatedTotalWage, setEstimatedTotalWage] = useState(0)
    const [category, setCategory] = useState('')
    const [requirements, setRequirements] = useState(['Add a Requirement'])
    const [dates, setDates] = useState([])
    const [hoursToWork, setHoursToWork] = useState('')


    const addJob = async (event) => {
        event.preventDefault()
        const location = await addLocation()
        const payload = {
            giverType: giverType,
            companyName: companyName,
            jobType: jobType,
            category: category,
            lowerWage: parseInt(lowerWage),
            upperWage: parseInt(upperWage),
            estimatedTotalWage: parseInt(estimatedTotalWage),
            description: description,
            requirements: requirements,
            location: location,
            dates: dates,
            salaryType: payRole,
            hoursToWork: hoursToWork
        }
        createJob(payload)
            .then(
                (response) => {
                    props.navigation.navigate("Home")
                }
            )
            .catch(
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }

    const onSelectingDate = (event, selectedDate) => {
        setShowDateTimePicker(false)
        const selectedDates = [...dates]
        selectedDates.push(selectedDate || date)
        setDates(selectedDates)
    }
    const renderDatePicker = () => {
        if (show) {
            return (
                <>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={false}
                        display="default"
                        onChange={onSelectingDate}
                    />
                </>
            )
        }
    }
    const addDate = () => {
        setShowDateTimePicker(true)
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
    const addRequirement = () => {
        const req = [...requirements]
        req.push('Add a Requirement')
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
                <View key={ index } style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter a requirement"
                        onChangeText={event => {
                            onChangeRequirement(event, index)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            )
        }
    )}

    const renderDates = () => {
        return dates.map((date, index) => {
            return (
                <View key={ index } style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder={date.toString()}
                        value={date}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            )
        }
    )}

    const renderCompanyForm = () => {
        return (
            <>
                <Text style={styles.text}>Company Name</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter Company Name"
                        onChangeText={event => {
                            setCompanyName(event)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
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
                <Text style={styles.text}>Requirements</Text>
                <View>
                    {
                        renderRequirements()
                    }
                    <TouchableOpacity
                        onPress={() => addRequirement()}
                        style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                        <Text style={{ fontSize: 18, color: 'white', borderColor: '#707070', borderRadius: 50 }} >+</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>{'Select Category'}</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <Picker
                        selectedValue={category}
                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategory(itemValue)
                        }
                    >
                        <Picker.Item label="Designer" value="designer" />
                        <Picker.Item label="Developer" value="developer" />
                    </Picker>
                </View>
                <Text style={styles.text}>{'Select Job Type'}</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <Picker
                        selectedValue={jobType}
                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setJobType(itemValue)
                        }
                    >
                        <Picker.Item label="Full-Time" value="Full Time" />
                        <Picker.Item label="Part-Time" value="Part Time" />
                    </Picker>
                </View>
                <Text style={styles.text}>{'Select Salary'}</Text>
                <View style={{
                    backgroundColor: 'white',
                    borderColor: '#bdbdbd',
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 30,
                    width: '100%',
                    marginBottom: 15
                }} >
                    <Picker
                        selectedValue={payRole}
                        style={{ height: 40, width: null, color: '#bdbdbd' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setPayRole(itemValue)
                        }
                    >
                        <Picker.Item label="Hourly" value="hourly" />
                        <Picker.Item label="Monthly" value="monthly" />
                    </Picker>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: '#bdbdbd',
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '49%',
                        marginBottom: 15
                    }} >
                        <TextInput
                            placeholder="Lower Range"
                            type="number"
                            style={{paddingLeft: 10, paddingTop: 5}}
                            onChangeText={event => {
                                setLowerWage(event)
                            }}
                        ></TextInput>
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        borderColor: '#bdbdbd',
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '49%',
                        marginBottom: 15
                    }} >
                        <TextInput
                            placeholder="Upper Range"
                            type="number"
                            style={{paddingLeft: 10, paddingTop: 5}}
                            onChangeText={event => {
                                setUpperWage(event)
                            }}
                        ></TextInput>
                    </View>
                </View>
                <Text style={styles.text}>{'Estimated Total Wage'}</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter Estimated Total Wage"
                        type="number"
                        style={{paddingLeft: 10}}
                        onChangeText={event => {
                            setEstimatedTotalWage(event)
                        }}
                    ></TextInput>
                </View>
                <Text style={styles.text}>{'Hours to Work'}</Text>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Example: 5-6"
                        style={{paddingLeft: 10}}
                        onChangeText={event => {
                            setHoursToWork(event)
                        }}
                    ></TextInput>
                </View>
                <Text style={styles.text}>{'Add Dates'}</Text>
                <View>
                    {renderDates()}
                    {renderDatePicker()}
                    <TouchableOpacity
                        onPress={() => addDate()}
                        style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                        <Text style={{ fontSize: 18, color: 'white', borderColor: '#707070', borderRadius: 50 }} >+</Text>
                    </TouchableOpacity>
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
                    onPress={event => addJob(event) }
                    style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                    <Text style={{ fontSize: 18, color: 'white' }} >Add Job</Text>
                </TouchableOpacity>
            </>
        )

    }

    return (
        <ImageBackground
            source={require("../../images/drawable-hdpi/Image24.png")}
            style={{ flex: 1, width: vw, backgroundColor: "#009C84" }}
        >
            <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>


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
                    {renderCompanyForm()}
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