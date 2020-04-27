import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Input, Button, Divider, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from '../firebase';
import ReAuthorization from '../LoginOverlay';

export default function UserDetails() {
    const [user, setUser] = useState({email: '', password: '', displayName: ''});
    const [hidePassword, setHidePassword] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isVerified = firebaseAuth.currentUser.emailVerified;

    useEffect(() => fetchUser(), []);

    const fetchUser = () => {
        firebaseAuth.currentUser.reload();
        setUser({
            email: firebaseAuth.currentUser.email,
            displayName: firebaseAuth.currentUser.displayName
        });
    };

    // Now we have a few functions for updating a user
    // Because some details are sensitive, we have to use a different method for updating
    const updateDetails = () => {
        if (firebaseAuth.currentUser.displayName !== user.displayName) {
            updateDisplayName();
        }
        if (firebaseAuth.currentUser.email !== user.email ||
                typeof user.password !== 'undefined') {
            updateSensitiveDetails();
        }
    };

    const updateDisplayName = () => {
        firebaseAuth.currentUser.updateProfile({
            displayName: user.displayName
        }).then(function() {
            Alert.alert("Settings Updated", "Your display name has been correctly updated.");
            fetchUser();
        }).catch(function(error) {
            Alert.alert("An error occurred: " + error);
        });
    };

    const updateSensitiveDetails = () => {
        if (isAuthorized) {
            if (firebaseAuth.currentUser.email !== user.email) {
                firebaseAuth.currentUser.updateEmail(user.email)
                .then(() => {
                    Alert.alert("Settings Updated", "Your email has been correctly updated.");
                    fetchUser();
                    setEmailError('');
                    verifyEmail();
                }).catch((error) => {
                    if (error.message.includes("formatted")) {
                        setEmailError("The email address is not valid");
                    } else if (error.message.includes("already")) {
                        setEmailError("Email address already in use");
                    } else {
                        Alert.alert(error.code + ": " + error.message);
                    }
                });
            }
            if (firebaseAuth.currentUser.password !== user.password) {
                firebaseAuth.currentUser.updatePassword(user.password)
                .then(() => {
                    Alert.alert("Settings Updated", "Your password has been correctly updated.");
                    fetchUser();
                }).catch((error) => {
                    if (error.message.includes("6 characters")) {
                        setPasswordError("Password must be at least 6 characters long");
                    } else {
                        Alert.alert(error);
                    }
                });
            }
        } else {
            setOverlayVisible(true);
        }
    };

    const verifyEmail = () => {
        firebaseAuth.currentUser.sendEmailVerification()
        .then(() => {
            Alert.alert("Email sent confirmation", "An email has been sent to your address with instructions on how to verify your account.");
        }).catch((error) => {
            Alert.alert("An error occurred: " + error);
        });
    };

    const deleteAccount = () => {
        if (isAuthorized) {
            Alert.alert(
                "Delete confirmation",
                "Are you sure you want to delete your account?\nThis action cannot be undone.",
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: "OK",
                        style: 'destructive',
                        onPress: () => {
                            firebaseAuth.currentUser.delete()
                            .then(() => {
                                Alert.alert("User deleted", "You are now logged out of the system.");
                            }).catch((error) => {
                                Alert.alert("An error occurred: " + error);
                            });
                        }
                    }
                ],
                {cancelable: false}
            );
        } else {
            setOverlayVisible(true);
        }
    };

    // For some sensitive changes we have to re-authenticate the user.
    // This function addresses that purpose
    const reAuthorized = () => {
        setIsAuthorized(true);
        Alert.alert("Login successful", "Please confirm your action.", [{text: "OK", onPress: () => setOverlayVisible(false)}]);
    };

    const logOut = () => {
        Alert.alert(
            "Sign out confirmation",
            "Are you sure you want to log out of the system?",
            [
                {text: 'Cancel', style: 'cancel'},
                {text: "OK",
                    style: 'destructive',
                    onPress: () => {
                        firebaseAuth.signOut()
                        .then(() => {
                            Alert.alert("You have successfully signed out.");
                          }).catch((error) => {
                            Alert.alert("An error occurred: " + error);
                          });
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1, height: '100%', alignItems: 'center'}}>
                <Overlay
                    isVisible={overlayVisible}
                    height='50%'
                    onBackdropPress={() => setOverlayVisible(false)}
                    overlayStyle={{padding: 0}}
                    overlayBackgroundColor='#f2f2f7'
                >
                    <ReAuthorization authorized={reAuthorized} firebaseAuth={firebaseAuth} />        
                </Overlay>
                <Header
                    containerStyle={{backgroundColor: '#141414'}}
                    barStyle="light-content"
                    centerComponent={{ text: 'USER DETAILS', style: { color: '#ffffff', fontWeight: '600' } }}
                />
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="e-mail" 
                        label="Your e-mail address"
                        value={user.email}
                        onChangeText={(value) => setUser({...user,  email: value})}
                        errorMessage={emailError} />
                    <Input
                        placeholder="Leave empty to keep current" 
                        label="New password"
                        value={user.password}
                        onChangeText={(value) => setUser({...user,  password: value})}
                        secureTextEntry={hidePassword}
                        errorMessage={passwordError}
                        rightIcon={
                            <Icon name="md-eye" size={20} onPress={() => setHidePassword(!hidePassword)} color="gray" />
                        } />
                    <Input
                        placeholder="Display name" 
                        label="Your display name"
                        value={user.displayName}
                        onChangeText={(value) => setUser({...user,  displayName: value})} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{padding: 10}}
                        icon={<Icon name="md-save" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={updateDetails}
                        title="UPDATE DETAILS" />
                    { !isVerified && <Button
                        style={{padding: 10}}
                        icon={<Icon name="md-mail" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={verifyEmail}
                        title="VERIFY EMAIL" /> }
                    <Button
                        buttonStyle={{backgroundColor: '#d43131'}}
                        style={{padding: 10}}
                        icon={<Icon name="md-trash" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={deleteAccount}
                        title="DELETE ACCOUNT" />
                        <Divider style={{backgroundColor: 'gray'}} />
                        <Button
                            buttonStyle={{backgroundColor: '#d43131'}}
                            style={{padding: 10}}
                            icon={<Icon name="ios-log-out" size={20} style={{paddingRight: 10}} color="#ffffff" />}
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
      width: '70%',
      margin: 30,
      marginBottom: '1%'
    },
    buttonContainer: {
      flex: 5,
      justifyContent: 'space-around',
      width: '55%',
      marginBottom: '2%'
    }
  });