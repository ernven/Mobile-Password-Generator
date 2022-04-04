import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { getAuth, updateProfile, updateEmail, sendEmailVerification, deleteUser } from 'firebase/auth';

import ReAuthorization from '../LoggedOutScreens/LoginOverlay';
import handleError from '../../utils/error-handler';

const auth = getAuth();

export default function UserDetails() {
  const [user, setUser] = useState({ email: '', password: '', displayName: '' });
  const [errors, setErrors] = useState({emailError: '', passwordError: ''});

  const [hidePassword, setHidePassword] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const isVerified = auth.currentUser.emailVerified;

  useEffect(() => fetchUser(), []);

  const fetchUser = () => {
    auth.currentUser.reload();
    setUser({
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName
    });
  };

  const updateUserDetails = () => {
    if (auth.currentUser.displayName !== user.displayName) {
      updateDisplayName();
    }
    if (auth.currentUser.email !== user.email ||
      typeof user.password !== 'undefined') {
      updateSensitiveDetails();
    }
  };

  const updateDisplayName = () => {
    updateProfile(auth.currentUser, { displayName: user.displayName })
      .then(() => {
        Alert.alert("Settings Updated", "Your display name has been correctly updated.");
        fetchUser();
      })
      .catch(error => Alert.alert("An error occurred: " + error));
  };

  const updateSensitiveDetails = () => {
    if (!authorized) {
      setOverlayVisible(true);
    } else {
      if (auth.currentUser.email !== user.email) {
        updateEmail(auth.currentUser, user.email)
          .then(() => {
            Alert.alert("Settings Updated", "Your email has been correctly updated.");
            fetchUser();
            setErrors({...errors, emailError: ''});
            verifyEmail();
          })
          .catch(error => setErrors(handleError(error.message)));
      }

      if (auth.currentUser.password !== user.password) {
        updatePassword(user, user.password)
          .then(() => {
            Alert.alert("Settings Updated", "Your password has been correctly updated.");
            fetchUser();
            setErrors({...errors, passwordError: ''});
          })
          .catch(error => setErrors(handleError(error.message)));
      }
    }
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Alert.alert("Email sent confirmation",
          "An email has been sent to your address with instructions on how to verify your account.");
      })
      .catch(error => Alert.alert("An error occurred: " + error));
  };

  const deletePrompt = () => {

    if (!authorized) {
      setOverlayVisible(true);
    } else {
      Alert.alert(
        "Delete confirmation",
        "Are you sure you want to delete your account?\nThis action cannot be undone.",
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: "OK",
            style: 'destructive',
            onPress: () => deleteAccount()
          }
        ],
        { cancelable: false }
      );
    }
  };

  const deleteAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        Alert.alert("User deleted", "You are now logged out of the system.");
      })
      .catch(error => Alert.alert("An error occurred: " + error));
  };

  // For some sensitive changes we have to re-authenticate the user
  const reAuthorize = () => {
    setAuthorized(true);
    Alert.alert(
      "Login successful",
      "Please confirm your action.",
      [{ text: "OK", onPress: () => setOverlayVisible(false) }]
    );
  };

  const logOut = () => {
    Alert.alert(
      "Sign out confirmation",
      "Are you sure you want to log out of the system?",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: "OK",
          style: 'destructive',
          onPress: () => {
            auth.signOut()
              .then(() => Alert.alert("You have successfully signed out."))
              .catch(error => Alert.alert("An error occurred: " + error));
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, height: '100%', alignItems: 'center' }}>

        {overlayVisible ? <ReAuthorization reAuthorize={reAuthorize} isCancellable={false} /> : null}

        <View style={styles.inputContainer}>
          <Input
            placeholder="e-mail"
            label="Your e-mail address"
            value={user.email}
            onChangeText={value => setUser({ ...user, email: value })}
            errorMessage={errors.emailError} />
          <Input
            placeholder="Leave empty to keep current"
            label="New password"
            value={user.password}
            onChangeText={value => setUser({ ...user, password: value })}
            secureTextEntry={hidePassword}
            errorMessage={errors.passwordError}
            rightIcon={
              <Icon name="md-eye" size={20} onPress={() => setHidePassword(!hidePassword)} color="gray" />
            } />
          <Input
            placeholder="Display name"
            label="Your display name"
            value={user.displayName}
            onChangeText={value => setUser({ ...user, displayName: value })} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={{ padding: 10 }}
            icon={<Icon name="md-save" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
            onPress={updateUserDetails}
            title="UPDATE DETAILS" />
          {!isVerified && <Button
            style={{ padding: 10 }}
            icon={<Icon name="md-mail" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
            onPress={verifyEmail}
            title="VERIFY EMAIL" />}
          <Button
            buttonStyle={{ backgroundColor: '#d43131' }}
            style={{ padding: 10 }}
            icon={<Icon name="md-trash" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
            onPress={deletePrompt}
            title="DELETE ACCOUNT" />
          <Divider style={{ backgroundColor: 'gray' }} />
          <Button
            buttonStyle={{ backgroundColor: '#d43131' }}
            style={{ padding: 10 }}
            icon={<Icon name="ios-log-out" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
            onPress={logOut}
            title="LOG OUT" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 4,
    justifyContent: "space-around",
    width: '80%',
    marginTop: 40,
    marginBottom: '1%'
  },
  buttonContainer: {
    flex: 5,
    justifyContent: 'space-around',
    width: '65%',
    marginBottom: '5%'
  }
});
