import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseAuth } from './components/firebase';

import UserLogin from './components/UserLogin';
import UserNew from './components/UserNew';
import MainScreen from './components/MainScreen';

const stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  if (!loggedIn) {
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