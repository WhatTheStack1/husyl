import React, { useEffect, useState } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, StyleSheet, Alert } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { getJob, updateJobStatus } from '../../functions/api';
import { Picker } from '@react-native-community/picker';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store'
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const vw = Dimensions.get("window").width
const vh = Dimensions.get("window").height

const JobDetails = (props) => {
    // console.log(props);
    const { id } = props.route.params;
    const [user, setUser] = useState({})
    const [job, setJob] = useState({})
    const [status, setStatus] = useState('')

    useEffect(() => {
        (async () =>{
        const storedUser = JSON.parse(await SecureStore.getItemAsync('user'))
        setUser(storedUser)
        getJob(id)
            .then(
                (response) => {
                    setJob(response.data.data)
                }
            )
            })}, [id])

    const onChangeStatus = (event) => {
        setStatus(event)
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

    const renderApplicants = () => {
        if (user.role === 'Giver') {
            return (
                <ScrollView>
                    <FlatList
                        data={job.applicants}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("ApplicationDetail", { user: item._id, job: id })}
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
                                                {item.firstName} {item.lastName}
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
                                                        color: '#858585'
                                                    }}>
                                                    State
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 10,
                                                        color: '#000000',
                                                        fontWeight: '700'
                                                    }}>
                                                    {item.jobSeeker.state}
                                                </Text>
                                            </View>
                                            <View style={{ padding: 5, width: '50%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 0,
                                                        color: '#858585'
                                                    }}>
                                                    Job Preference
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 0,
                                                        color: '#000000',
                                                        fontWeight: '700',
                                                        marginLeft: 10
                                                    }}>
                                                    {item.jobSeeker.jobPreference}
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
                                                        color: '#858585'
                                                    }}>
                                                    Category
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 10,
                                                        fontWeight: '700',
                                                        color: 'red'
                                                    }}>
                                                    {item.jobSeeker.category}
                                                </Text>
                                            </View>
                                            <View style={{ padding: 5, width: '50%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 0,
                                                        color: '#858585'
                                                    }}>
                                                    Experience
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        textAlign: 'justify',
                                                        marginLeft: 0,
                                                        color: 'green',
                                                        fontWeight: '700',
                                                        marginLeft: 10
                                                    }}>
                                                    {item.jobSeeker.experience}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ padding: 5 }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    textAlign: 'justify',
                                                    color: '#858585',
                                                    fontWeight: '700'
                                                }}>
                                                {item.jobSeeker.biography}
                                            </Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={1}
                        keyExtractor={(item, index) => index}
                    />
                </ScrollView>
            )
        }
        else {
            return (
                <>
                    <Text>No Applicants</Text>
                </>
            )
        }
    }
    if (job) {
        return (
            <>
                <ImageBackground
                    source={require("../../images/Image101.png")}
                    style={{ height: vh / 5, width: vw, backgroundColor: "#009c84", alignItems: 'flex-end' }}
                >
                    {
                        job.approvedUsers ?
                            job.approvedUsers.indexOf(user._id) !== -1 ?
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Chat")}
                                    style={{ backgroundColor: 'red', borderRadius: 30, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, marginTop: 40, marginRight: 10 }}
                                >
                                    <Text style={{ fontSize: 18, color: 'white' }}>Chat</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("ApplyForJob", { id: id })}
                                    style={{ backgroundColor: 'red', borderRadius: 30, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, marginTop: 40, marginRight: 10 }}
                                >
                                    <Text style={{ fontSize: 18, color: 'white' }}>Apply</Text>
                                </TouchableOpacity>
                            :
                            <>
                            </>
                    }
                </ImageBackground>

                <View style={styles.ImageViewStyle}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#009c84", fontSize: 22 }}>Pic</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', borderColor: '#bdbdbd', height: 40, borderWidth: 1, borderRadius: 30, flexDirection: "row", width: '100%', marginBottom: 15, marginTop: 15 }}>
                    <Picker
                        selectedValue={status}
                        style={{ height: 40, width: '100%', color: '#bdbdbd' }}
                        onValueChange={(itemValue, itemIndex) =>
                            onChangeStatus(itemValue)
                        }
                    >
                        <Picker.Item label="Live" value="Live" />
                        <Picker.Item label="Completed" value="Completed" />
                        <Picker.Item label="Ongoing" value="Ongoing" />
                    </Picker>
                </View>
                <View style={{ marginLeft: 10, marginTop: 50 }}>
                    <View>
                        <Text style={styles.hourAndNameStyle}>
                            ${job.lowerWage}-${job.upperWage} per {job.salaryType}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <AirbnbRating
                                size={25}
                                showRating={false}
                                defaultRating="4"
                            />
                            <Text style={styles.ratingStyleColor}>4</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, marginLeft: 10 }}>
                    <TouchableOpacity
                        style={styles.indivialViewStyle}
                        onPress={() => props.navigation.navigate("Chating")}
                    >
                        <Text style={{ textAlign: "center", alignSelf: "center", color: "white", fontSize: 14 }}>CHAT</Text>
                    </TouchableOpacity>
                    {job.giverType === "individual" ?
                        <Text style={styles.hourAndNameStyle}>
                            {job.companyName}
                        </Text>
                        :
                        <Text style={styles.hourAndNameStyle}>
                            {job.companyName}
                        </Text>
                    }
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ textAlign: "justify", color: "#a9a9a9" }}>
                        {job.description}
                    </Text>
                </View>
                <View>

                    <ScrollView style={{ femarginTop: 20, marginBottom: 10, marginTop: 10 }} horizontal={true}>
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

                <ScrollView>

                    <View
                        style={styles.breakLneForViewStyle}
                    />
                    <View style={{ marginLeft: 12, marginTop: 10 }}>
                        {job.dates ? job.dates.map(date =>
                            <Text>
                                -{moment(date).format('dddd DD, MMMM, YYYY')}-
                            </Text>
                        ) :
                            <Text>No dates</Text>
                        }
                    </View>
                    <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Job Title</Text>
                        <Text style={styles.innerText}>{job.category}</Text>
                    </View>
                    <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Description</Text>
                        <Text style={styles.innerText}>
                            {job.description}
                        </Text>
                    </View>
                    <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Job Type</Text>
                        <Text style={styles.innerText}>
                            {job.salaryType === 'hourly' ? 'Hourly' : 'Monthly'} Recruiter
                        </Text>
                    </View>

                    <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Requirements</Text>
                        {
                            job.requirements ? job.requirements.map(requirement =>
                                <View style={styles.viewSeperator, { flexDirection: "row", marginTop: 10 }}>
                                    <AntDesign
                                        name="check"
                                        color="#009c84"
                                        size={24}
                                    />
                                    <Text style={{ marginLeft: 10 }}>{requirement}</Text>
                                </View>
                            ) :
                                <Text>No requirements</Text>
                        }
                    </View>
                    <View
                        style={styles.breakLneForViewStyle}
                    />
                    {job.user ?
                        job.user._id === user._id ?
                            <View>
                                <View
                                    style={{ marginTop: 10 }}
                                >
                                    {job.user ? renderApplicants() : <Text>No Applicants yet</Text>}
                                </View>
                                <View
                                    style={styles.breakLneForViewStyle}
                                />
                            </View>
                            :
                            <>
                            </>
                        :
                        <>
                        </>
                    }
                    <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Location</Text>
                        {
                            job.location ?
                                <View>
                                    <Text>{job.location.address}</Text>
                                    <Text>
                                        {job.location.coordinates.longitude}, {job.location.coordinates.latitude}
                                    </Text>
                                </View>
                                :
                                <Text>No Location</Text>
                        }
                        {/* <Text>Abilene, TX 79699</Text> */}
                    </View>
                    <View>
                        {/* <Image
                            source={require("../images/drawable-ldpi/Image99.png")}
                            style={{ width: vw }}
                        /> */}
                    </View>
                    <View style={{ height: 200, width: vw }}>
                        {
                            job.location ?
                                <MapView
                                    style={{ flex: 1 }}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={{
                                        // latitude: this.state.latitude,
                                        // longitude: this.state.longitude,
                                        // latitudeDelta: 0.0043,
                                        // longitudeDelta: 0.0034
                                        latitude: job.location.coordinates.latitude,
                                        longitude: job.location.coordinates.longitude,
                                        latitudeDelta: 0.05,
                                        longitudeDelta: 0.0421,
                                    }}
                                    showsUserLocation={true}
                                // onPress={(e) => this.handlePress(e.nativeEvent)}

                                >
                                </MapView>
                                :
                                <>
                                </>
                        }
                    </View>
                    {/* <View style={styles.viewSeperator}>
                        <Text style={styles.headingText}>Travel Tips</Text>
                        <Text style={styles.innerText}>Park in the parking lot at the ACU Student Center, address is 1950 ACU Dr,Abilene TX <Text>79699</Text>and walk to the football stadium</Text>
                    </View> */}
                    <View
                        style={{ marginTop: 20 }}
                    />
                </ScrollView>
            </>
        )
    } else {
        return (
            <View style={{ paddingTop: 25 }}>
                <Text>Fetching Job ...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold"
    },
    ImageViewStyle: {
        position: "absolute",
        backgroundColor: "white",
        borderColor: "white",
        elevation: 10,
        top: 0.18 * vw,
        marginLeft: 10,
        height: 110,
        borderWidth: 1,
        borderRadius: 500,
        width: 110,
    },
    hourAndNameStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 26,
        marginRight: 10
    },
    ratingStyleColor: {
        alignSelf: "center",
        fontSize: 16,
        marginRight: 10,
        color: "#FFD203"
    },
    indivialViewStyle: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: 100,
        height: 46,
        backgroundColor: "#009c84",
        borderRadius: 200
    },
    scrollimage: {
        height: 70,
        width: 70,
        marginLeft: 10,
        marginRight: 10
    },
    breakLneForViewStyle: {
        height: 10, backgroundColor: "#dbdbdb"
    },
    headingText: {
        color: "#4D4D4D",
        fontSize: 18
    },
    innerText: {
        color: "#707070",
        fontSize: 16,
        textAlign: "justify"
    },
    viewSeperator: {
        marginTop: 10,
        marginLeft: 12,
        marginHorizontal: 20
    }

})

export default JobDetails