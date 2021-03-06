import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// This enables the native screen optimization for each system (iOS and Android)
import { enableScreens } from 'react-native-screens';

import { firebaseAuth } from '../firebase';

import PasswordGen from './PasswordGen';
import PasswordList from './PasswordList';
import UserDetails from './UserDetails';

enableScreens();

const tab = createBottomTabNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        let color;
                        if (route.name === 'New') {
                            iconName = focused ? 'ios-add-circle-outline' : 'ios-add-circle-outline';
                            color = focused ? '#2685f8' : 'gray';
                        } else if (route.name === 'Passwords') {
                            iconName = focused ? 'ios-list' : 'ios-list';
                            color = focused ? '#2685f8' : 'gray';
                        } else if (route.name === 'User') {
                            iconName = focused ? 'md-contact' : 'md-contact';
                            color = focused ? '#2685f8' : 'gray';
                        }
                        return <Icon name={iconName} size={30} style={{paddingTop: 4}} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: '#2685f8',
                    inactiveTintColor: 'gray',
                }}
            >
                <tab.Screen name="New" component={PasswordGen} initialParams={{uid: firebaseAuth.currentUser.uid}} />
                <tab.Screen name="Passwords" component={PasswordList} initialParams={{uid: firebaseAuth.currentUser.uid}} />
                <tab.Screen name="User" component={UserDetails} />
            </tab.Navigator>
        </NavigationContainer>
    );
}