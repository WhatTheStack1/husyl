import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomePageHeader from '../../components/HomePageHeader'
import { Card } from 'react-native-paper';
import { getJobs } from '../../functions/api'

const Home = (props) => {
    //const {refresh} = 
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getJobs()
            .then(
                (response) => {
                    setJobs(response.data.data)
                }
            )
    }, )

    const renderCards = () => {
        return jobs.map(job => {
            return (
                <Card style={{ width: "49%" }} >
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("JobDetails", { id: job._id })}
                    >
                        <Card.Cover style={{ height: 130, flex: 1 }} source={{ uri: 'https://picsum.photos/700' }} />
                    </TouchableOpacity>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 13, textAlign: 'justify', marginLeft: 5, marginRight: 5, color: "#858585" }}>We are looking for best fashion designers</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 5 }}>
                            {/* <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Text style={{ color: '#009C84', fontWeight: "bold" }}>View</Text>
                            </TouchableOpacity> */}
                            <View>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", marginVertical: 3 }}>
                                    <MaterialCommunityIcons
                                        name="cash-usd"
                                        color="#858585"
                                        size={15}
                                        style={{ marginRight: 2, marginLeft: 10 }}
                                    />
                                    <Text style={{ fontSize: 10, color: "#858585" }}>
                                        {
                                            '$' + job.lowerWage + '-$' + job.upperWage + ' per ' + job.salaryType 
                                        }
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", marginVertical: 3 }}>
                                    <EvilIcons
                                        name="location"
                                        color="#858585"
                                        size={15}
                                        style={{ marginRight: 2, marginLeft: 10, fontWeight: 'bold' }}
                                    />
                                    <Text style={{ fontSize: 10, color: "#858585" }}>{job.location.address}</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", marginVertical: 3 }}>
                                    <MaterialCommunityIcons
                                        name="briefcase"
                                        color="#858585"
                                        size={14}
                                        style={{ marginRight: 2, marginLeft: 10 }}
                                    />
                                    <Text style={{ fontSize: 10, color: "#858585" }}>
                                        {
                                            job.hourToWork + ' per ' + job.salaryType === 'hourly' ? 'hour' : 'month'
                                        }
                                    </Text>
                                    <Text style={{ fontSize: 10, color: '#FF9E40', left: 3 }}>{job.jobType}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        })
    }
    return (
        <>
            <HomePageHeader
                navprops={props.navigation}
                title="Trending Jobs"
                head1="Trending"
                head2="All"
                screenName={'Home'}
            />
            <ScrollView style={{ flex: 1, margin: 20 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginBottom: 10,
                    flexWrap: 'wrap'
                }}>
                    {
                        renderCards()
                    }
                </View>
            </ScrollView>
        </>

    )
}

export default Home