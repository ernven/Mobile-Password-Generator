import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from './firebase';

export default function UserDetails() {
    const [user, setUser] = useState({diplayName: firebaseAuth.currentUser.displayName, email: firebaseAuth.currentUser.email, phoneNumber: firebaseAuth.currentUser.phoneNumber});

    //useEffect(setUser(firebaseAuth.currentUser.displayName), []);

    const updateDetails = () => {
        Alert.alert("Settings Updated", "Your user settings have been correctly updated.")
    };

    const resetPassword = () => {
        Alert.alert("Password Reset Confirmation", "An email has been sent to your address with instructions on how to reset your password.")
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
                        firebaseAuth.signOut().then(function() {
                            Alert.alert("You have successfully signed out.");
                          }).catch(function(error) {
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
                        disabled={true} />
                    <Input
                        placeholder="Display name" 
                        label="Display name"
                        value={user.diplayName} />
                    <Input
                        placeholder="Phone number" 
                        label="Phone number"
                        value={user.phoneNumber} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={{backgroundColor: '#51c72a'}}
                        style={{padding: 10}}
                        icon={<Icon name="md-save" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={updateDetails}
                        title="UPDATE DETAILS" />
                    <Button
                        style={{padding: 10}}
                        icon={<Icon name="md-lock" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={resetPassword}
                        title="RESET PASSWORD" />
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
    }
  });