import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Input, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from './firebase';
import ReAuthorization from './ReAuthorization';

export default function UserDetails() {
    const [user, setUser] = useState({displayName: '', email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

    useEffect(fetchUser, []);

    const fetchUser = () => {
        firebaseAuth.currentUser.reload();
        setUser({
            displayName: firebaseAuth.currentUser.displayName,
            email: firebaseAuth.currentUser.email,
            password: firebaseAuth.currentUser.password
        });
    };

    const handleInputChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    // Now we have a few functions for updating a user
    // Because some details are sensitive, we have to use a different method for updating
    const updateDetails = () => {
        if (firebaseAuth.currentUser.displayName !== user.displayName) {
            updateDisplayName;
        }
        if (firebaseAuth.currentUser.email !== user.email &&
                firebaseAuth.currentUser.password !== user.password) {
            setOverlayVisible(true);
        }
    };

    const updateDisplayName = () => {
        firebaseAuth.currentUser.updateProfile({
            displayName: user.displayName
        }).then(function() {
            Alert.alert("Settings Updated", "Your user settings have been correctly updated.");
            fetchUser;
        }).catch(function(error) {
            Alert.alert("An error occurred: " + error);
        });
    };

    const updateSensitiveDetails = () => {
        if (firebaseAuth.currentUser.email !== user.email) {
            firebaseAuth.currentUser.updateEmail(user.email)
            .then(() => {
                Alert.alert("Settings Updated", "Your user settings have been correctly updated.");
                fetchUser;
                verifyEmail;
            }).catch((error) => {
                Alert.alert("An error occurred: " + error);
            });
        }
        if (firebaseAuth.currentUser.password !== user.password) {
            firebaseAuth.currentUser.updatePassword(user.password)
            .then(() => {
                Alert.alert("Settings Updated", "Your user settings have been correctly updated.");
                fetchUser();
                verifyEmail();
            }).catch((error) => {
                Alert.alert("An error occurred: " + error);
            });
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
        if (reAuth) {
            firebaseAuth.currentUser.delete()
            .then(() => {
                Alert.alert("User deleted", "You are now logged out of the system.");
            }).catch((error) => {
                Alert.alert("An error occurred: " + error);
            });
        }
    };

    // For some sensitive changes we have to re-authenticate the user.
    // This function is for that purpose
    const reAuthorize = (credentials) => {
        setOverlayVisible(false);
        firebaseAuth.currentUser.reauthenticateWithCredential(credentials)
        .then(() => {
            updateSensitiveDetails();
        }).catch((error) => {
            Alert.alert("An error occurred: " + error);
        });
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
            <ReAuthorization reAuthorize={reAuthorize} overlayVisible={overlayVisible} />
            <View style={{flex: 1, height: '100%', alignItems: 'center'}}>
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
                        onChange={handleInputChange} />
                    <Input
                        placeholder="Password" 
                        label="Your password"
                        value={user.pass}
                        onChange={handleInputChange}
                        secureTextEntry={showPassword} />
                    <Button
                        buttonStyle={{backgroundColor: 'transparent'}}
                        icon={<Icon name="md-eye" size={20} style={{paddingLeft: 5, paddingRight: 5}} color="gray" />}
                        onPress={setShowPassword(!showPassword)} />
                    <Input
                        placeholder="Display name" 
                        label="Your display name"
                        value={user.displayName}
                        onChange={handleInputChange} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{padding: 10}}
                        icon={<Icon name="md-save" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={updateDetails}
                        title="UPDATE DETAILS" />
                    <Button
                        buttonStyle={{backgroundColor: '#51c72a'}}
                        style={{padding: 10}}
                        icon={<Icon name="md-lock" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={verifyEmail}
                        title="VERIFY EMAIL" />
                    <Button
                        buttonStyle={{backgroundColor: '#d43131'}}
                        style={{padding: 10}}
                        icon={<Icon name="md-trash" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={deleteAccount}
                        title="DELETE ACCOUNT" />
                    <Divider style={styles.divider} />
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
      margin: 30
    },
    buttonContainer: {
      flex: 5,
      justifyContent: 'space-between',
      width: '55%',
      marginBottom: '10%'
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 20,
        marginRight: 20
    }
  });