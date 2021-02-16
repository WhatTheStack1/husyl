import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Dimensions } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

import { getApplication } from '../../functions/api'
import moment from 'moment'

const vh = Dimensions.get("window").height
const vw = Dimensions.get("window").width

const ApplicationDetail = (props) => {
    const { user, job } = props.route.params;
    const [application, setApplication] = useState({})

    useEffect(() => {
        getApplication(user, job)
            .then(
                (response) => {
                    setApplication(response.data.data)
                }
            )
    }, [])

    const approveApplicant = (event) => {
        const data = {
            id: id,
            payload: {
                status: status
            }
        }
        updateJobStatus(data)
            .then(
                (response) => {
                    setInterval(() => {
                        Alert.alert(response.data.message)
                    }, 500)
                }
            )
            .catch(
                (error) => {
                    setInterval(() => {
                        Alert.alert(error.response.data.message)
                    }, 500)
                }
            )
    }

    const renderTopImage = () => {
        return (
            <ImageBackground
                source={require("../../images/Image101.png")}
                style={{ height: vh / 5, width: vw, backgroundColor: "#009c84" }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItem: "flex-end", marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("AddJob")}
                        style={{ backgroundColor: 'red', width: '80%', borderRadius: 30, justifyContent: 'center', alignItem: 'center', paddingVertical: 10, paddingHorizontal: 20 }}
                    >
                        <Text style={{ fontSize: 18, color: 'white' }}>Add Job</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
    return (
        <>
            {renderTopImage()}
            <View style={{ paddingTop: 25 }}>
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            color: '#FFFFFF',
                            backgroundColor: 'yellow',
                            fontWeight: 700
                        }}
                        onPress={() => approveApplicant()}
                    >
                        Approve
                </TouchableOpacity>
                </View>
                <ScrollView>
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
                                    fontSize: 16,
                                    textAlign: 'justify',
                                    color: "#000000",
                                    fontWeight: '700'
                                }}>
                                Applicant Detail
                        </Text>
                        </View>
                        <View style={{ padding: 5 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    textAlign: 'justify',
                                    color: "#000000",
                                    fontWeight: '700'
                                }}>
                                {moment(application.createdAt).format('dddd MMMM DD, YYYY')}
                            </Text>
                        </View>
                        {
                            application.applicant ?
                                <View>
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
                                                Name
                                    </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    textAlign: 'justify',
                                                    marginLeft: 10,
                                                    fontWeight: '700',
                                                    color: "red"
                                                }}>
                                                {application.applicant.firstName} {application.applicant.lastName}
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
                                                Email
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
                                                ${application.applicant.email}
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
                                                State
                                    </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    textAlign: 'justify',
                                                    marginLeft: 10,
                                                    fontWeight: '700',
                                                    color: "red"
                                                }}>
                                                {application.applicant.jobSeeker.state}
                                            </Text>
                                        </View>
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
                                                {application.applicant.jobSeeker.category}
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
                                                {application.applicant.jobSeeker.jobType}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <>
                                </>
                        }
                        <View style={{ padding: 5 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'justify',
                                    color: "#000000",
                                    fontWeight: '700'
                                }}>
                                Job Details
                        </Text>
                        </View>
                        <View style={{ padding: 5 }}>
                            {
                                application.job ?
                                    application.job.requirements.map((requirement, index) =>
                                        <Text
                                            index={index}
                                            style={{
                                                fontSize: 16,
                                                textAlign: 'justify',
                                                color: "#000000"
                                            }}>
                                            -{requirement}
                                        </Text>
                                    )
                                    :
                                    <>
                                    </>
                            }
                        </View>
                        {
                            application.job ?
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
                                            ${application.job.lowerWage}-$ {application.job.upperWage} per {application.job.salaryType === 'hourly' ? 'hour' : 'month'}
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
                                            ${application.job.estimatedTotalWage}
                                        </Text>
                                    </View>
                                </View>
                                :
                                <>
                                </>
                        }
                        <View style={{ padding: 5 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'justify',
                                    color: "#000000",
                                    fontWeight: '700'
                                }}>
                                Applicant's Requirement
                        </Text>
                        </View>
                        <View style={{ padding: 5 }}>
                            {
                                application.requirements ?
                                    application.requirements.map((requirement, index) =>
                                        <Text
                                            index={index}
                                            style={{
                                                fontSize: 16,
                                                textAlign: 'justify',
                                                color: "#000000"
                                            }}>
                                            -{requirement}
                                        </Text>
                                    )
                                    :
                                    <>
                                    </>
                            }
                        </View>
                    </Card>
                </ScrollView>
            </View>
        </>
    )
}

export default ApplicationDetail