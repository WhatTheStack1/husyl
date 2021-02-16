import React, { useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, Modal } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import { Entypo } from '@expo/vector-icons';


const Vh = Dimensions.get("window").height
const Vw = Dimensions.get("window").width

class FindJobs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: 24,
      longitude: 67,
      isModalVisible: false
    }
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        this.setState({ latitude: location.latitude, longitude: location.longitude })
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
    // setTimeout(() => {
    //   this.setState({ isModalVisible: true })
    // }, 5000);
  }

  handlePress = (e) => {
    this.setState({isModalVisible:true})
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };



  render() {
    // alert(this.state.isModalVisible)
    return (
      <>
        <Modal
          animationIn={"slideInUp"}
          // animationOut={"slideInUp"}
          animationInTiming={1000}
          animationOutTiming={3000}
          isVisible={this.state.isModalVisible}
          style={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>

            <View style={{
              backgroundColor: "white",
              position: "absolute",
              flexDirection: "row",
              width: Vw,
              flex: 1,
              // justifyContent:"center"
              alignItems: "center"
            }}
            >
              <Image
                source={require("../../images/ic_launcher.png")}
                style={{ height: 86, width: 82 }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Premium Retail</Text>
                <Text>Nov 09,9:00pm-5:30pm</Text>
                <Text>Merchandising</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: 'flex-end', flex: 1, marginRight: 5 }}>
                <View>
                  <Entypo
                    name="cross"
                    size={18}
                    onPress={() => this.setState({ isModalVisible: false })}
                  />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$12/hr</Text>
                <Text>Est$90.80</Text>
              </View>
            </View>

          </View>

        </Modal>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              // latitude: this.state.latitude,
              // longitude: this.state.longitude,
              // latitudeDelta: 0.0043,
              // longitudeDelta: 0.0034
              latitude: 24.8804,
              longitude: 67.0391,
              latitudeDelta: 0.05,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            onPress={(e) => this.handlePress(e.nativeEvent)}
            
          >

            <Marker
              coordinate={{
                latitude: 24.8804,
                longitude: 67.0391,
              }}
              onPress={(e) => this.handlePress(e.nativeEvent)}
              
            >


              <Image
                source={require("../../images/drawable-ldpi/husylpointer.png")}
                style={{ height: 40, width: 30 }}
              />
              {/* <Callout tooltip>
              <TouchableHighlight onPress={()=>this.handlePress()}>
                <View>
                  <Text>Hello</Text>
                </View>
              </TouchableHighlight>
              </Callout> */}
            </Marker>

          </MapView>
        </View>
      </>
    )
  }
}

export default FindJobs
