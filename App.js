import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebaseAuth } from './components/firebase';

// This enables the native screen optimization for each system (iOS and Android)
import { enableScreens } from 'react-native-screens';

import LoadingScreen from './components/LocalAuth';
import UserLogin from './components/LoggedOutScreens/UserLogin';
import UserNew from './components/LoggedOutScreens/UserNew';
import MainScreen from './components/LoggedInScreens/MainScreen';

enableScreens();

const stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // We use this variable to check whether a user is already logged in,
  // in which case local authentication is used (e.g. TouchID on iOS)
  var loggedOut = false;

  useEffect(() => listener(), []);

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
        }
      }
    })
  };

  // This is for handling the local authorization
  const handleAuthSuccess = async () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen handleAuthSuccess={handleAuthSuccess} />;
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