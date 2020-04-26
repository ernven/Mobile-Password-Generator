import React, { useState } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from '../firebase';

import LoadingScreen from '../LocalAuth';
import PasswordGen from './PasswordGen';
import PasswordList from './PasswordList';
import UserDetails from './UserDetails';

const tab = createBottomTabNavigator();

export default function App() {
    const [inactive, setInactive] = useState(false);

    AppState.addEventListener('change', () => {
        if (AppState.currentState === 'inactive' || AppState.currentState === 'background') {
            setInactive(true);
        }
    });

    // This is for handling the local authorization on App resume
    const handleAuthSuccess = () => {
        setInactive(false);
    };

    if (inactive) {
        return <LoadingScreen handleAuthSuccess={handleAuthSuccess} />;
    } else {
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
}