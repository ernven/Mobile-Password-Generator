import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from './firebase';

export default function UserNew() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };

    return (
        <View style={{flex: 1, alignItems: "center", padding: 20}}>
            <Text h4 style={{marginTop: 100}}>Sign up with a new user</Text>
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
                    icon={<Icon style={{paddingRight: 10}} name="md-person-add" size={20} color="#ffffff" />}
                    onPress={signUp}
                    title="Sign Up" />
            </View>
        </View>
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