import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { NavigationContainer } from 'react-navigation-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Drawer'

import { EvilIcons, Ionicons } from '@expo/vector-icons';

import Who from '../containers/Who'

import Login from '../containers/Users/Login'
import SignUp from '../containers/Users/Signup'
import JobGiver from '../containers/Users/Giver'
import Seeker from '../containers/Users/Seeker'
import Profile from '../containers/Users/Profile';

import Home from '../containers/Jobs/index'
import AddJob from '../containers/Jobs/Add'
import MyJobs from '../containers/Jobs/MyJobs'
import FindJobs from '../containers/Jobs/Find'
import JobDetails from '../containers/Jobs/Detail'

import CreateApplication from '../containers/Applications/Create'
import ApplicationDetail from '../containers/Applications/Detail'

import Payment from '../containers/Payment';
import Chat from '../containers/Chat'
import MessageScreen from '../containers/Chats/MessageScreen'
import Filter from '../containers/Filter'

import OpenJobPosting from '../containers/Payments/OpenJobPosting';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const Tab = createMaterialTopTabNavigator();


// function TopNavigation() {

//   return <Tab.Navigator>
//     <Tab.Screen name="All" component={All} />
//     <Tab.Screen name="Trending" component={Trending} />
//   </Tab.Navigator>

// }

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };



  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <EvilIcons
          name="navicon"
          color="black"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}



function HomeStackScreen({ navigation }) {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Who"
        component={Who}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="JobGiver"
        component={JobGiver}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="JobSeeker"
        component={Seeker}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="AddJob"
        component={AddJob}
        options={{
          headerShown: null
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: null
        }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerShown: null
        }}
      />
      <Stack.Screen
        name="MyJobs"
        component={MyJobs}
        options={{
          headerShown: null
        }}
      />
      <Stack.Screen
        name="ApplicationDetail"
        component={ApplicationDetail}
        options={{
          headerShown: null
        }}
      />
      <Stack.Screen
        name="ApplyForJob"
        component={CreateApplication}
        options={{
          headerShown: null
        }}
      />
      <Stack.Screen
        name="OpenJobPosting"
        component={OpenJobPosting}
        options={{
          headerShown: null
        }}
      />

    </Stack.Navigator>
  );
}

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          // headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          // headerTitle: 'Home',
          // headerTitleAlign: 'center',
          // headerBackTitleStyle: { color: 'white' },
          // headerStyle: { backgroundColor: '#008080', borderWidth: 1 },
          // headerTitleStyle: { color: 'white', fontSize: 18 },
          // headerTintColor: 'white'
          headerShown: false
        }}

      />
    </Stack.Navigator>
  )
}
function PaymentStackNavigation({ navigation }) {
  return <Stack.Navigator>
    <Stack.Screen
      name="Payment"
      component={Payment}
      options={{
        headerLeft: () => <Ionicons
          name="chevron-back"
          color="white"
          style={{ marginLeft: 5 }}
          size={32}
          onPress={() => { navigation.goBack() }}
        />,
        headerStyle: {
          backgroundColor: "#009C84"
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 16
        }
      }}

    />
  </Stack.Navigator>
}
function ChatStackNavigation({ navigation }) {
  return <Stack.Navigator>
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{
        headerLeft: () => <Ionicons
          name="chevron-back"
          color="white"
          style={{ marginLeft: 5 }}
          size={32}
          onPress={() => { navigation.goBack() }}
        />,
        headerStyle: {
          backgroundColor: "#009C84"
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 16
        }
      }}
    />
    <Stack.Screen name="Message" component={MessageScreen} options={{
      headerTitle: "Ryan Scheinder",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 16,

      },
      headerStyle: {
        elevation: 10,

      },
      headerLeft: () => <Ionicons
        name="chevron-back"
        color="#707070"
        size={28}
        onPress={() => { navigation.navigate("Chat") }}
      />,
      // headerRight: () => <FontAwesome
      //   name="bell-o"
      //   color="black"
      //   size={30}

      // />

    }}
    />
  </Stack.Navigator>
}
function MessageStack({ navigation }) {
  return <Stack.Navigator>
    <Stack.Screen
      name="MyJobs"
      component={MyJobs}
      options={{
        headerLeft: () => <Ionicons
          name="chevron-back"
          color="#707070"
          style={{ marginLeft: 5 }}
          size={32}
          onPress={() => { navigation.goBack() }}
        />,
        headerStyle: {
          backgroundColor: "white"
        },
        headerTitle: "Enter the Requirements",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          elevation: 10
        }
      }}
    />
  </Stack.Navigator>
}
function ChatScreenStack({ navigation }) {
  return <Stack.Navigator>
    <Stack.Screen
      name="Chating"
      component={MessageScreen}
      options={{
        headerLeft: () => <Ionicons
          name="chevron-back"
          color="white"
          style={{ marginLeft: 5 }}
          size={32}
          onPress={() => { navigation.goBack() }}
        />,
        headerStyle: {
          backgroundColor: "#009c84"
        },
        headerTitle: "Name of Company/Individual",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          elevation: 10
        }
      }}
    />
  </Stack.Navigator>
}

function ContentForDrawer({ navigation }) {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={isLargeScreen ? null : { width: '80%' }}
        drawerContent={props => <CustomDrawerContent {...props} />}

      >
        <Drawer.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeStackScreen}

        />
        <Drawer.Screen
          name="Profile"
          options={{
            headerShown: false,
          }}
          component={ProfileStackScreen}
        />
        <Drawer.Screen
          name="Chat"
          options={{
            headerShown: false
          }}
          component={ChatStackNavigation}
        />
        <Drawer.Screen
          name="Chating"
          component={ChatScreenStack}
        />
        <Drawer.Screen
          name="Find Jobs"
          options={{
            headerShown: false,
          }}
          component={FindJobs}
        />
        <Drawer.Screen
          name="Payment"
          component={PaymentStackNavigation}
          options={{
            headerShown: false
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ContentForDrawer;