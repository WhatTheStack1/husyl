import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';

const Payment = () => {

    const _onChange = (form) => {
        console.log(form);
    }

    // // will print:
    // {
    //   valid: true, // will be true once all fields are "valid" (time to enable the submit button)
    //   values: { // will be in the sanitized and formatted form
    //       number: "4242 4242",
    //       expiry: "06/19",
    //       cvc: "300",
    //       type: "visa", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
    //       name: "Sam",
    //       postalCode: "34567",
    //   },
    //   status: {  // will be one of ["incomplete", "invalid", and "valid"]
    //     number: "incomplete",
    //     expiry: "incomplete",
    //     cvc: "incomplete",
    //     name: "incomplete", 
    //     postalCode: "incomplete",
    //   },
    // };
    const renderScrollImage = () => {
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <Image
                    source={require("../images/avatar.jpg")}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
                <Text style={{ alignSelf: 'center', fontSize: 12, marginTop: 5 }}>HDFC</Text>
            </View>
        )
    }
    const renderTransactionCard = () => {
        return (
            <Card style={{ elevation: 5, borderRadius: 10, marginHorizontal: 20, marginVertical: 10 }}>
                <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, marginTop: 6 }}>$500</Text>
                    </View>
                    <View style={{ marginLeft: 10, flex: 0.6 }}>
                        <Text>$Samantha Pitsbergh Paypal</Text>
                        <Text style={{ color: '#58595B' }}>1st Jan 2020 </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 0.4 }}>
                        <Image
                            source={require("../images/drawable-hdpi/check.png")}
                            style={{ height: 50, width: 50, borderRadius: 50, color: 'black' }}
                        />
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <View style={{ paddingTop: 25 }}>
            <ScrollView >
                <Card style={{ paddingVertical: 10 }} >
                    <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
                        <TouchableOpacity>
                            <Image
                                source={require("../images/drawable-hdpi/paypal.png")}
                                style={{ marginBottom: 10, height: 50, width: 50 }}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600", marginLeft: 5 }}> Amazon Pay</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                            <Text style={{ color: "#009C84" }}>LINK ACCOUNT</Text>
                        </View>
                    </View>

                    <View
                        style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: "#919090", marginHorizontal: 20 }}
                    />

                    <View style={{ flexDirection: 'row', marginHorizontal: 12, marginTop: 5, marginBottom: 10 }}>
                        <TouchableOpacity>
                            <Image
                                source={require("../images/drawable-hdpi/amazon.png")}
                                style={{ marginBottom: 10, height: 50, width: 50 }}
                            />
                        </TouchableOpacity>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600", marginLeft: 5 }}>PayPal</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                            <Text style={{ color: "#009C84" }}>LINK ACCOUNT</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>stripe</Text>
                            <View style={{ flexDirection: "row", top: 5, justifyContent: 'space-evenly' }}>
                                <Image
                                    source={require("../images/drawable-hdpi/paypal.png")}
                                    style={{ height: 50, width: 50 }}
                                />
                                <Image
                                    source={require("../images/drawable-hdpi/paypal.png")}
                                    style={{ height: 50, width: 50 }}
                                />
                                <Image
                                    source={require("../images/drawable-hdpi/paypal.png")}
                                    style={{ height: 50, width: 50 }}
                                />
                                <Image
                                    source={require("../images/drawable-hdpi/paypal.png")}
                                    style={{ height: 50, width: 50 }}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
                <View style={{ padding: 13, marginTop: 2 }}>
                    <Text>NETBANKING</Text>
                </View>
                <Card>
                    <ScrollView horizontal={true} style={{ paddingTop: 20, paddingBottom: 10, marginLeft: 12 }}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {renderScrollImage()}
                        {/* </View> */}

                    </ScrollView>
                    <View
                        style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: "#919090", marginHorizontal: 20 }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10, marginHorizontal: 12 }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#009C84', fontWeight: '500' }}>MORE BANKS</Text>
                        </TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            color={'#bdbdbd'}
                            size={22}
                        // onPress={() => { navigation.navigate(navigateTo) }}
                        />
                    </View>
                </Card>
                <View style={{ padding: 10 }}>
                    <Text>PAY ON ARRIVAL</Text>
                </View>
                <Card>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <MaterialCommunityIcons
                            name="cash-usd"
                            color="#858585"
                            size={30}
                            style={{ marginLeft: 5, marginTop: 3, marginRight: 5 }}
                        />
                        <View style={{ padding: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>CASH</Text>
                            <Text style={{ color: '#bdbdbd' }}>Online payment recomended to reduce issues</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: 'flex-end', marginRight: 10 }}>
                            <AntDesign
                                name="checkcircleo"
                                size={24}
                                color="#DCDCDC"
                                style={{ fontWeight: 'bold' }}
                            />
                        </View>
                    </View>
                    <View >
                        <Text style={{ color: '#009C84', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Transaction History</Text>
                    </View>
                    {renderTransactionCard()}
                    {renderTransactionCard()}
                </Card>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldSet: {
        margin: 10,
        // paddingHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 8,
        borderRadius: 5,
        borderWidth: 3,
        // alignItems: 'center',
        borderColor: '#a9a9a9',


    },
    legend: {
        position: 'absolute',
        top: -30,
        left: 13,

        fontWeight: "bold",
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 35
    }
});


export default Payment