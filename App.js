import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/containers/Splash';
import ContentForDrawer from './src/navigation/Content';

LogBox.ignoreAllLogs()
const Stack = createStackNavigator();

export default function App() {

  const [appState, setAppState] = React.useState('splash')

  React.useEffect(() => {
    setTimeout(() => {
      setAppState('auth')
    }, 5000);
  }, [])

  const renderSplash = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Splash" component={Splash} options={{
            headerShown: false
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )

  }

  return (
    // <View style={styles.container}>
    //   {
    //     appState === 'splash' ? renderSplash() : <ContentForDrawer />
    //   }
    // </View>
    <>
      {
        appState === 'splash' ? renderSplash() : <ContentForDrawer />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
