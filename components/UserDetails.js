import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserDetails() {

    return (
        <View style={{flex: 1, height: '100%'}}>
            <Header
                containerStyle={{backgroundColor: '#141414'}}
                barStyle="light-content"
                centerComponent={{ text: 'USER DETAILS', style: { color: '#ffffff', fontWeight: '600' } }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Username" 
                    label="Username" />
                <Input
                    placeholder="Password" 
                    label="Password"
                    secureTextEntry={true} /> 
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{padding: 10}}
                    icon={<Icon style={{paddingRight: 10}} name="md-save" size={20} color="#ffffff" />}
                    title="UPDATE" />
                <Button
                    buttonStyle={{backgroundColor: '#d43131'}}
                    style={{padding: 10}}
                    icon={<Icon style={{paddingRight: 10}} name="ios-log-out" size={20} color="#ffffff" />}
                    onPress={() => props.navigation.navigate('SignUp')}
                    title="LOG OUT" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 4,
      alignItems: "center",
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