import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { firebaseAuth } from './components/firebase';

import LoadingScreen from './components/LocalAuth';
import SignInPortal from './components/LoggedOutScreens/SignInPortal';
import MainScreen from './components/LoggedInScreens/MainScreen';

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
          Alert.alert(
            "Email not yet verified",
            "Please check your inbox or re-send a verification email by going to the user panel.",
            [{ text: "OK", onPress: () => setUser(currUser) }]
          );
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
    return <LoadingScreen handleAuthSuccess={handleAuthSuccess} user={user} />;
  } else if (user === null) {
    return <SignInPortal />;
  } else {
    return <MainScreen />;
  }
}
