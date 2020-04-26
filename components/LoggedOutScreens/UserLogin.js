import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from '../firebase';

export default function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const login = () => {
        setEmailError('');
        setPasswordError('');
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
            if (!firebaseAuth.currentUser.emailVerified) {
                Alert.alert("Email not verified", "Please check your inbox or re-send a verification email by going to the user panel.");
            }
        })
        .catch((error) => {
            if (error.code.includes("email")) {
                setEmailError("The email address is not valid");
            } else if (error.message.includes("user record")) {
                setEmailError("Email address not found");
            } else if (error.code.includes("wrong-password")) {
                setPasswordError("Password does not match");
            } else {
                Alert.alert(error.code + ": " + error.message);
            }
        });
    };

    const resetPassword = () => {
        firebaseAuth.sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert("Password Reset Confirmation", "An email has been sent to your address with instructions on how to reset your password.");
        })
        .catch((error) => {
            Alert.alert("An error occurred: " + error);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1, alignItems: "center"}}>
                <Text h4 style={{marginTop: 100}}>Log in with existing user</Text>
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
                        icon={<Icon name="ios-log-in" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={login}
                        title="SIGN IN" />
                <Button
                    style={{padding: 10}}
                    icon={<Icon name="ios-key" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                    onPress={resetPassword}
                    title="RESET PASSWORD" />
                <Divider style={styles.divider} />
                <Button
                    buttonStyle={{backgroundColor: '#51c72a'}}
                    style={{padding: 10}}
                    icon={<Icon name="md-person-add" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                    onPress={() => props.navigation.navigate('SignUp')}
                    title="NEW USER" />
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
      width: '60%',
      marginBottom: '15%'
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 20,
        marginRight: 20
    }
  });