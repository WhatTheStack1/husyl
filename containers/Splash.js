import React from 'react'
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native'
import first from '../images/first.jpeg'
import second from '../images/second.jpeg'
import third from '../images/third.jpeg'

const vh = Dimensions.get("window").height
const vw = Dimensions.get("window").width

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            img: first
        };
    }
    tick() {
        if (this.state.screen == 0) {

            this.setState(state => ({
                screen: state.screen + 1,
            }));
        }
        else if (this.state.screen == 1) {

            this.setState(state => ({
                screen: state.screen + 1, img: second
            }));
        }
        else if (this.state.screen == 2) {

            this.setState(state => ({
                screen: state.screen + 1, img: third
            }));
        }



        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkRender = () => {
        if (this.state.screen == 0) {
            return (
                //     <ImageBackground
                //     source={require("../images/firstsplash.png")}
                //     style={{ height: vh, width: null,flex:1 }}
                // >
                //     </ImageBackground>
                <View style={{ marginTop: '10%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require("../images/drawable-mdpi/logo.png")}
                        />
                        <Text style={{ fontSize: 50 }}>HUSYL</Text>
                        <Text style={{ fontSize: 24, marginTop: 10 }}>GET A HUSYL - MAKE MONEY!</Text>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Image
                                source={require("../images/drawable-ldpi/meeting.png")}
                                resizeMode="cover"
                                style={{ justifyContent: 'flex-end' }}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        else if (this.state.screen == 1) {
            return (
                <>
                    <ImageBackground
                        source={require("../images/drawable-hdpi/bag.png")}
                        style={{ height: vh, width: null, flex: 1 }}
                    >
                        <View style={{ position: "absolute", bottom: 0, left: 15 }}>
                            <Text style={{ fontSize: 45 }}>GET </Text>
                            <Text style={{ fontSize: 45, color: "#009c84" }}>A NEW</Text>
                            <Text style={{ fontSize: 45 }}>HUSYL</Text>
                        </View>

                        {/* <View style={{ position: 'absolute', left: 50, bottom: 30, justifyContent: 'center' }}>
                        <Image
                            source={require("../images/drawable-ldpi/new.png")}
                        />
                    </View> */}
                    </ImageBackground>
                </>
            )
        }

        else if (this.state.screen == 2) {
            return (
                <>
                    <ImageBackground
                        source={require("../images/drawable-hdpi/payment.png")}
                        style={{ height: vh, width: null, flex: 1 }}
                    >
                        {/* <View style={{ position: 'absolute', left: 0, bottom: 30, justifyContent: 'center' }}>
                        <Image
                            source={require("../images/drawable-hdpi/getpaid.png")}
                        />
                    </View> */}
                        <View style={{ position: "absolute", bottom: 0, left: 15 }}>
                            <Text style={{ fontSize: 45, color: "white" }}>GET </Text>
                            <Text style={{ fontSize: 45, color: "white" }}>PAID</Text>
                            <Text style={{ fontSize: 45, color: "white" }}>IN 24-48</Text>
                            <Text style={{ fontSize: 45, color: "white" }}>HOURS.</Text>
                        </View>
                    </ImageBackground>

                </>
            )
        }
    }

    render() {
        return (
                <View style={{ flex: 1, backgroundColor: '#C3C3C3' }}>
                    {this.checkRender()}
                </View>
        )
    }
}

export default Splash