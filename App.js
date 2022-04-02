import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './utils/firebase';
import LocalAuth from './components/LoggedOutScreens/LocalAuth';
import SignInPortal from './components/LoggedOutScreens/SignInPortal';
import MainScreen from './components/LoggedInScreens/MainScreen';

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listener();
    if (!user) {
      setLoading(false);
    }
  }, []);

  // This listener is used to keep track of a user's session on Firebase
  const listener = () => {
    onAuthStateChanged(auth, authUser => {
      if (!authUser) {
        setUser(null);
        setLoading(false);
      } else {
        setUser(authUser)
        if (!authUser.emailVerified) {
          Alert.alert(
            "Email not yet verified",
            "Please check your inbox or re-send a verification email by going to the user panel.",
            [{ text: "OK" }]
          )
        }
      }
    })
  };

  // This is for handling the local authorization
  const handleAuthSuccess = async () => setLoading(false);

  if (loading) {
    return <LocalAuth handleAuthSuccess={handleAuthSuccess} user={user} />;
  } else if (user === null) {
    return <SignInPortal />;
  } else {
    return <MainScreen />;
  }
}
