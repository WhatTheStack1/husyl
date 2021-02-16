import React, { useState } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker';

import { SafeAreaView } from 'react-navigation';

import { addJobSeeker, setUser } from '../../functions/api';

const vw = Dimensions.get("window").width

const Seeker = (props) => {
    const [officialIdentity, setOfficialIdentity] = useState('');
    const [state, setState] = useState('');
    const [biography, setBiography] = useState('');
    const [experience, setExperience] = useState('');
    const [jobPreference, setJobPreference] = useState('Full Time');
    const [category, setCategory] = useState('');
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);

    const addGiverDetail = async (event) => {
        event.preventDefault()
        const payload = {
            officialIdentity: officialIdentity,
            state: state,
            biography: biography,
            experience: experience,
            jobPreference: jobPreference,
            category: category,
            languages: languages,
            skills: skills
        }
        addJobSeeker(payload)
            .then(
                (response) => {
                    setUser(response.data.data)
                    props.navigation.navigate("Home", { refresh: true })
                }
            )
            .catch(
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }

    const addLanguage = () => {
        const lang = [...languages]
        lang.push('Add a Language')
        setLanguages(lang)
    }
    const onChangeLanguage = (event, index) => {
        const lang = [...languages]
        lang[index] = event
        setLanguages(lang)
    }
    const renderLanguages = () => {
        return languages.map((language, index) => {
            return (
                <View key={ index } style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Enter a requirement"
                        onChangeText={event => {
                            onChangeLanguage(event, index)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            )
        }
    )}

    const addSkill = () => {
        const ski = [...skills]
        ski.push('Add a Skill')
        setSkills(ski)
    }
    const onChangeSkill = (event, index) => {
        const ski = [...skills]
        ski[index] = event
        setSkills(ski)
    }
    const renderSkills = () => {
        return skills.map((skill, index) => {
            return (
                <View key={ index } style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <TextInput
                        placeholder="Add a skill"
                        onChangeText={event => {
                            onChangeSkill(event, index)
                        }}
                        style={{paddingLeft: 10}}
                    ></TextInput>
                </View>
            )
        }
    )}

    return (
        <ImageBackground
            source={require("../../images/drawable-hdpi/Image24.png")}
            style={{ flex: 1, width: vw, backgroundColor: "#009C84" }}
        >
            <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>


            <ScrollView style={{ paddingHorizontal: 25, paddingVertical: 7, marginHorizontal: 10, marginTop: 2 }}>
                <KeyboardAvoidingView >
                    <Text style={styles.text}>Identity Number</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            placeholder="Identity Number"
                            onChangeText={event => {
                                setOfficialIdentity(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>

                    <Text style={styles.text}>Biography</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Add you biography"
                            onChangeText={event => {
                                setBiography(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>

                    <Text style={styles.text}>State</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            placeholder="Your State"
                            onChangeText={event => {
                                setState(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>

                    <Text style={styles.text}>Experience</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            placeholder="Example: 1"
                            onChangeText={event => {
                                setExperience(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>

                    <Text style={styles.text}>Category</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                        <TextInput
                            placeholder="Your Field Category"
                            onChangeText={event => {
                                setCategory(event)
                            }}
                            style={{paddingLeft: 10}}
                        ></TextInput>
                    </View>

                    <Text style={styles.text}>Preference</Text>
                    <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15 }}>
                    <Picker
                        selectedValue={jobPreference}
                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                        onValueChange={(event, index) =>
                            setJobPreference(event)
                        }
                    >
                        <Picker.Item label="Full Time" value="Full Time" />
                        <Picker.Item label="Part Time" value="Part Time" />
                        <Picker.Item label="Contract" value="Contract" />
                        <Picker.Item label="Project Based" value="Project Based" />
                    </Picker>
                    </View>

                    {/* Skills and Languages */}
                    <Text style={styles.text}>Skills</Text>
                    <View>
                        {
                            renderSkills()
                        }
                        <TouchableOpacity
                            onPress={() => addSkill()}
                            style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                            <Text style={{ fontSize: 18, color: 'white', borderColor: '#707070', borderRadius: 50 }} >+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>Languages</Text>
                    <View>
                        {
                            renderLanguages()
                        }
                        <TouchableOpacity
                            onPress={() => addLanguage()}
                            style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                            <Text style={{ fontSize: 18, color: 'white', borderColor: '#707070', borderRadius: 50 }} >+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={event => addGiverDetail(event) }
                        style={{ backgroundColor: '#009C84', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginLeft: 30, marginBottom: 30 }}>
                        <Text style={{ fontSize: 18, color: 'white' }} >Complete Profile</Text>
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

export default Seeker