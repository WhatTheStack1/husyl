import React, { useCallback, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import RangeSlider from 'rn-range-slider';
import Thumb from './Slider/Thumb'
import Label from './Slider/Label'
import RailSelected from './Slider/RailSelected'
import Notch from './Slider/Notch'
import Rail from './Slider/Rail'
import { FlatList } from 'react-native-gesture-handler';


const Filter = ({ navigation, route }) => {
    const { screen } = route && route?.params

    const [rangeDisabled, setRangeDisabled] = useState(false);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(100);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [floatingLabel, setFloatingLabel] = useState(false);



    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    const categories = ["App Development", "IOS", "Android", "Mobile screens", "App Development", "IOS", "Android"]

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 60, backgroundColor: '#009C84', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <EvilIcons
                        onPress={() => {
                            console.log(screen, 'routesss');
                            screen ?
                                navigation.navigate(screen) :
                                navigation.navigate('Home', { name: route.params.name })
                        }
                        }
                        name="close"
                        color="white"
                        size={18}
                        style={{ fontWeight: 'bolder', top: 5 }}
                    />
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>FILTER SEARCHES</Text>
                    <View></View>
                    {/* harami ye uper 
                    kiya kara hai react navigation ka header l
                    agata na. bc chaypi ha tu 
                    bhuaat bara :p */}
                </View>

            </View>
            <View style={{ flex: 8, marginVertical: 20, marginHorizontal: 10 }}>
                <ScrollView>
                    <Text style={styles.text}>Select Categories for job searches</Text>

                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[
                                        styles.showElements,
                                        index > 3 ? {
                                            marginTop: 10,

                                        } : index == 0 ? {
                                            backgroundColor: "#009c84"
                                        } : null
                                    ]}>
                                        <Text style={[
                                            styles.innerstyle,
                                            index == 0 ? {
                                                color: "white"
                                            } : null
                                        ]}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flex: 0.7, justifyContent: "center" }}>
                            <Text style={styles.text}>Industry</Text>
                        </View>
                        <View style={{
                            borderColor: '#bdbdbd',
                            height: 30,
                            borderWidth: 1,
                            borderRadius: 30,
                            flexDirection: "row",
                            flex: 0.5,
                            justifyContent: "flex-end",
                        }}>

                            <TextInput
                                style={{ fontSize: 6, marginLeft: 10 }}
                                // placeholder='What Are you looking for?'
                                placeholderTextColor="#DCDCDC"

                            >
                            </TextInput>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginRight: 10 }}>
                                <EvilIcons
                                    name="search"
                                    color="black"
                                    size={24}
                                // style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                                />
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[
                                        styles.showElements,
                                        index > 3 ? {
                                            marginTop: 10,

                                        } : index == 0 ? {
                                            backgroundColor: "#009c84"
                                        } : null
                                    ]}>
                                        <Text style={[
                                            styles.innerstyle,
                                            index == 0 ? {
                                                color: "white"
                                            } : null
                                        ]}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flex: 0.7, justifyContent: "center" }}>
                            <Text style={styles.text}>Priority Searches</Text>
                        </View>
                        <View style={{
                            borderColor: '#bdbdbd',
                            height: 30,
                            borderWidth: 1,
                            borderRadius: 30,
                            flexDirection: "row",
                            flex: 0.5,
                            justifyContent: "flex-end",
                        }}>

                            <TextInput
                                style={{ fontSize: 6, marginLeft: 15 }}
                                // placeholder='What Are you looking for?'
                                placeholderTextColor="#DCDCDC"

                            >
                            </TextInput>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginRight: 10 }}>
                                <EvilIcons
                                    name="search"
                                    color="black"
                                    size={24}
                                // style={{ marginRight: 2, marginTop: 8, marginLeft: 10, fontWeight: 'bold' }}
                                />
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[
                                        styles.showElements,
                                        index > 3 ? {
                                            marginTop: 10,

                                        } : index == 0 ? {
                                            backgroundColor: "#009c84"
                                        } : null
                                    ]}>
                                        <Text style={[
                                            styles.innerstyle,
                                            index == 0 ? {
                                                color: "white"
                                            } : null
                                        ]}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />

                    <Text style={styles.text}>Sector Prefrence</Text>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[
                                        styles.showElements,
                                        index > 3 ? {
                                            marginTop: 10,

                                        } : index == 0 ? {
                                            backgroundColor: "#009c84"
                                        } : null
                                    ]}>
                                        <Text style={[
                                            styles.innerstyle,
                                            index == 0 ? {
                                                color: "white"
                                            } : null
                                        ]}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />

                    <Text style={styles.text}>Type</Text>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ paddingTop: 25 }}>
                                    <View>
                                        <TouchableOpacity style={[
                                            styles.showElements,
                                            index > 3 ? {
                                                marginTop: 10,

                                            } : index == 0 ? {
                                                backgroundColor: "#009c84"
                                            } : null
                                        ]}>
                                            <Text style={[
                                                styles.innerstyle,
                                                index == 0 ? {
                                                    color: "white"
                                                } : null
                                            ]}>{item}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />

                    <Text style={{ fontWeight: "bold", marginLeft: 3, fontSize: 22, paddingTop: 5, marginVertical: 10, fontSize: 18 }}>Finance</Text>
                    <RangeSlider
                        style={styles.slider}
                        min={0}
                        max={100}
                        step={1}
                        floatingLabel
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onValueChanged={handleValueChange}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log(screen, 'routesss');
                                screen ?
                                    navigation.navigate(screen) :
                                    navigation.navigate('Home')

                            }
                            }
                            style={{ marginVertical: 20, backgroundColor: '#009C84', paddingHorizontal: 80, paddingVertical: 10, borderRadius: 30 }}>
                            <Text style={{ fontSize: 18, color: 'white' }} >APPLY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 6

        // marginLeft: 3
    },
    showElements: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        justifyContent: "space-around",
        borderRadius: 18,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "#F5F5F5",
        margin: 2,
        borderColor: "transparent",
        elevation: 2


    },
    innerstyle: {
        textAlign: "center",
        fontSize: 11,
        color: "#707070",
        paddingLeft: 5,
        paddingRight: 5
        // elevation
    }

});

export default Filter