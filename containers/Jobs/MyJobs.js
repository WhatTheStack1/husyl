import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Dimensions, Alert } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

import { getMyJobs } from '../../functions/api'
import moment from 'moment'

import * as SecureStore from 'expo-secure-store'

const vh = Dimensions.get("window").height
const vw = Dimensions.get("window").width

const MyJobs = (props) => {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getMyJobs()
            .then(
                (response) => {
                    setJobs(response.data.data)
                }
            )
    }, [])

    const handleAddJobClick = async () => {
        const user = JSON.parse(await SecureStore.getItemAsync('user'))
        // Alert.alert(JSON.stringify(user.allowedToPostJob))
        if (user.jobGiver.giverType === "Company") {
            if(user.allowedToPostJob)
            props.navigation.navigate("AddJob")
            else {
                props.navigation.navigate("OpenJobPosting")
            }
        } else {
            props.navigation.navigate("AddJob")
        }
    }

    const renderTopImage = () => {
        return (
            <ImageBackground
                source={require("../../images/Image101.png")}
                style={{ height: vh / 5, width: vw, backgroundColor: "#009c84" }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => handleAddJobClick()}
                        style={{ backgroundColor: 'red', width: '80%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 }}
                    >
                        <Text style={{ fontSize: 18, color: 'white' }}>Add Job</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

    if (jobs.length > 0) {
        return (
            <>
                {renderTopImage()}
                <View style={{ paddingTop: 25 }}>
                    <ScrollView>
                        <FlatList
                            data={jobs}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate("JobDetails", { id: item._id })}
                                    >
                                        <Card style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            marginVertical: 10,
                                            marginLeft: 5,
                                            marginRight: 5,
                                            paddingVertical: 10,
                                            borderTopWidth: 10,
                                            borderTopColor: 'green'
                                        }} >
                                            <View style={{ padding: 5 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        color: "#000000",
                                                        fontWeight: '700'
                                                    }}>
                                                    {moment(item.createdAt).format('dddd MMMM DD, YYYY')}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                }}>
                                                <View style={{ padding: 5, width: '50%' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "#858585"
                                                        }}>
                                                        Category
                                                </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 10,
                                                            color: "#000000",
                                                            fontWeight: '700'
                                                        }}>
                                                        {item.category}
                                                    </Text>
                                                </View>
                                                <View style={{ padding: 5, width: '50%' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "#858585"
                                                        }}>
                                                        Job Preference
                                                </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "#000000",
                                                            fontWeight: '700',
                                                            marginLeft: 10
                                                        }}>
                                                        {item.jobType}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <View style={{ padding: 5, width: '50%' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "#858585"
                                                        }}>
                                                        Hourly Wage
                                                </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 10,
                                                            fontWeight: '700',
                                                            color: "red"
                                                        }}>
                                                        ${item.lowerWage}-$ {item.upperWage} per {item.salaryType === 'hourly' ? 'hour' : 'month'}
                                                    </Text>
                                                </View>
                                                <View style={{ padding: 5, width: '50%' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "#858585"
                                                        }}>
                                                        Estimated Wage
                                                </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            textAlign: 'justify',
                                                            marginLeft: 0,
                                                            color: "green",
                                                            fontWeight: '700',
                                                            marginLeft: 10
                                                        }}>
                                                        ${item.estimatedTotalWage}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={1}
                            keyExtractor={(item, index) => index}
                        />
                    </ScrollView>
                </View>
            </>
        )
    }
    else {
        return (
            <>
                {renderTopImage()}
                <View style={{ marginTop: 20, textAlign: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>No job Posted</Text>
                </View>
            </>
        )
    }
}

export default MyJobs