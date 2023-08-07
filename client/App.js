
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LandmarkScreen from './screens/LandmarkScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';


const Stack = createStackNavigator();

function CustomHeader() {
  return <Header />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: props => <CustomHeader {...props} />
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="LandmarkScreen"
          component={LandmarkScreen}
        />
        <Stack.Screen
          name="ImageViewer"
          component={ImageViewerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

