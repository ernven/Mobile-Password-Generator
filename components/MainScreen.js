import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PasswordGen from './PasswordGen';
import PasswordList from './PasswordList';
import UserDetails from './UserDetails';

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
                <tab.Screen name="New" component={PasswordGen} />
                <tab.Screen name="Passwords" component={PasswordList} />
                <tab.Screen name="User" component={UserDetails} />
            </tab.Navigator>
        </NavigationContainer>
    );
}