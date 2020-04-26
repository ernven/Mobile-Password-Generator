import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from '../firebase';

export default function UserNew() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const signUp = () => {
        setEmailError('');
        setPasswordError('');
        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebaseAuth.currentUser.sendEmailVerification()
            .then(() => {
                Alert.alert("Email sent confirmation", "An email has been sent to your address with instructions on how to verify your account.");
            }).catch((error) => {
                Alert.alert("An error occurred: " + error);
            });
        })
        .catch((error) => {
            if (error.message.includes("formatted")) {
                setEmailError("The email address is not valid");
            } else if (error.message.includes("6 characters")) {
                setPasswordError("Password must be at least 6 characters long");
            } else if (error.message.includes("already")) {
                setEmailError("Email address already in use");
            } else {
                Alert.alert(error.code + ": " + error.message);
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, alignItems: "center", padding: 20}}>
            <Text h4 style={{marginTop: 100}}>Sign up with a new user</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="e-mail" 
                    label="Your e-mail address"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    errorMessage={emailError} />
                <Input
                    placeholder="Password" 
                    label="Password"
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    secureTextEntry={true}
                    errorMessage={passwordError} /> 
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{padding: 10}}
                    icon={<Icon name="md-person-add" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                    onPress={signUp}
                    title="SIGN UP" />
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 4,
      justifyContent: "space-around",
      width: '75%',
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20
    },
    buttonContainer: {
      flex: 5,
      justifyContent: 'space-around',
      width: '50%',
      marginBottom: '15%'
    }
  });