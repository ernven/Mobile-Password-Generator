import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from './firebase';

export default function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert("An error occurred: " + errorCode + ". " + errorMessage);
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
                        icon={<Icon style={{paddingRight: 10}} name="ios-log-in" size={20} color="#ffffff" />}
                        onPress={login}
                        title="Sign In" />
                    <Button
                        buttonStyle={{backgroundColor: '#51c72a'}}
                        style={{padding: 10}}
                        icon={<Icon style={{paddingRight: 10}} name="md-person-add" size={20} color="#ffffff" />}
                        onPress={() => props.navigation.navigate('SignUp')}
                        title="New User" />
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
    }
  });