import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseAuth } from './components/firebase';
import * as LocalAuthentication from 'expo-local-authentication';

import LoadingScreen from './components/LoadingScreen';
import UserLogin from './components/UserLogin';
import UserNew from './components/UserNew';
import MainScreen from './components/MainScreen';

const stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // We use this variable to check whether a user is already logged in,
  // in which case local authentication is used (e.g. TouchID on iOS)
  var loggedOut = false;

  // This listener is used to keep track of a user's session on Firebase
  const listener = () => {
    firebaseAuth.onAuthStateChanged(currUser => {
      if (currUser === null) {
        loggedOut = true;
        setUser(currUser);
        setLoading(false);
      } else {
        if (loggedOut) {
          setUser(currUser);
          setLoading(false);
        } else {
          setUser(currUser);
          authorize();
        }
      }
    })
  };

  useEffect(() => listener(), []);

  // With this function we handle the local auth using the device's biometric auth or passcode (as available)
  const options = { promptMessage: "Please authenticate to continue" };

  const authorize = async () => {
    const result = await LocalAuthentication.authenticateAsync(options);
    if (result.success) {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen authorize={authorize} />;
  } else if (user === null) {
    return (
      <NavigationContainer>
        <stack.Navigator mode={'modal'} >
          <stack.Screen name="Login" component={UserLogin} options={{headerShown: false}} />
          <stack.Screen name="SignUp" component={UserNew} options={{title: ''}} />
        </stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <MainScreen />;
  }
}