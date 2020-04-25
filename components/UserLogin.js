import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from './firebase';

export default function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
            if (!firebaseAuth.currentUser.emailVerified) {
                Alert.alert("Email not verified", "Please check your inbox or re-send a verification email by going to the user panel.");
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert("An error occurred: " + errorCode + ". " + errorMessage);
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
                        value={email} />
                    <Input
                        placeholder="Password" 
                        label="Password"
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={true} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={{padding: 10}}
                        icon={<Icon name="ios-log-in" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={login}
                        title="SIGN IN" />
                <Button
                    buttonStyle={{backgroundColor: '#d8db00'}}
                    style={{padding: 10}}
                    icon={<Icon name="md-key" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                    onPress={resetPassword}
                    title="FORGOT PASSWORD" />
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
      width: '70%',
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20
    },
    buttonContainer: {
      flex: 5,
      justifyContent: 'space-around',
      width: '50%',
      marginBottom: '15%'
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 20,
        marginRight: 20
    }
  });