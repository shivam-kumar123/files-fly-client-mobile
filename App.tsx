import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DownloadInput } from './components/DownloadInput';
import Home from './components/Home';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 40, 
            borderTopWidth: 3, // Add a top border for separation
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 22, 
          },
          tabBarIcon: () => null,
        }}
      >
        <Tab.Screen name="Upload File" component={Home} options={{ tabBarLabel: 'Upload' }} />
        <Tab.Screen name="Download File" component={DownloadInput} options={{ tabBarLabel: 'Download' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
