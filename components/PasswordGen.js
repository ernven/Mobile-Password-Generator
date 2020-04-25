import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Input, Divider, Button, CheckBox, Text, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseDB } from './firebase';

export default function PasswordGen(props) {
    const [accountName, setAccountName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alphanumOnly, setAlphanumOnly] = useState(false);
    const [length, setLength] = useState(12);

    useEffect(() => getPassword(), []);

    const getPassword = () => {
        // First provider uses url like https://password.markei.nl/random.json?symbols=false&min=8&max=8
        // Second provider uses this https://api.random.org/json-rpc/2/invoke and some request parameters
        // I have used the second for this project. The personal apiKey is removed for publishing of source code.
        let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*()=-_.';
        if (alphanumOnly) {
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        fetch('https://api.random.org/json-rpc/2/invoke', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "generateStrings",
                "params": {
                    "apiKey": "",
                    "n": 1,
                    "length": length,
                    "characters": characters
                },
                "id": 100
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => setPassword(responseJSON.result.random.data[0]))
        .catch((error) => Alert.alert('Error', error))
    };

    const saveAccount = () => {
        if (accountName === '') {
            Alert.alert("Error", "The account name cannot be empty.");
        } else {
            const currDate = new Date().toISOString();
            firebaseDB.ref('/users/' + props.route.params.uid).push(
                { 'a': accountName, 'u': username, 'p': password, 'd': currDate }
            );
            setAccountName('');
            setUsername('');
            getPassword();
            Keyboard.dismiss;
            Alert.alert("Success", "The login details have been saved.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1, height: '100%'}}>
                <Header
                    containerStyle={{backgroundColor: '#141414'}}
                    barStyle="light-content"
                    centerComponent={{ text: 'NEW CREDENTIALS', style: { color: '#ffffff', fontWeight: '600' } }}
                />
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Enter the service provider" 
                        label="Account Name"
                        onChangeText={(accountName) => setAccountName(accountName)}
                        value={accountName} />
                    <Input
                        placeholder="Enter your username or email" 
                        label="User ID"
                        onChangeText={(username) => setUsername(username)}
                        value={username} />
                    <Input 
                        label="Password"
                        disabled={true}
                        value={password} />
                    <CheckBox
                        title='Letters and numbers only'
                        containerStyle={{backgroundColor: 'transparent'}}
                        textStyle={{color: 'gray'}}
                        iconType="material"
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        checkedColor='green'
                        checked={alphanumOnly}
                        onPress={() => setAlphanumOnly(!alphanumOnly)} />
                    <Text style={{color: 'gray'}}>Password length:</Text>
                    <Slider
                        minimumValue={8}
                        maximumValue={24}
                        step={1}
                        thumbTintColor='#141414'
                        value={length}
                        onValueChange={(length) => setLength(length)} />
                    <Text style={{color: 'gray'}}>Current: {length}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={{backgroundColor: '#51c72a'}}
                        style={{padding: 10}}
                        icon={<Icon name="md-refresh" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={getPassword}
                        title="GENERATE NEW" />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button
                        style={{padding: 10}}
                        icon={<Icon name="md-save" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={saveAccount}
                        title="SAVE DETAILS" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 6,
      justifyContent: "space-between",
      marginTop: 30,
      marginLeft: 40,
      marginRight: 40
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      margin: 30
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 20,
        marginRight: 20
    }
});