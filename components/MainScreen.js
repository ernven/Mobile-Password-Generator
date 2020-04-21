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
                            iconName = focused ? 'ios-add-circle' : 'ios-add';
                            color = focused ? 'blue' : 'gray';
                        } else if (route.name === 'Passwords') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                            color = focused ? 'blue' : 'gray';
                        } else if (route.name === 'User') {
                            iconName = focused ? 'md-contact' : 'md-contact';
                            color = focused ? 'blue' : 'gray';
                        }
                        return <Icon name={iconName} size={35} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
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