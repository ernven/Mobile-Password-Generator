import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Input, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListItemDetails(props) {
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const openHandler = () => {
        setVisible(true);
    };

    const resetPassword = () => {
        props.firebaseAuth.sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert(
                "Password Reset Confirmation",
                "An email has been sent to your address with instructions on how to reset your password.",
                [{text: "OK", onPress: () => setVisible(false)}]
            );
        })
        .catch((error) => {
            if (error.code.includes('not-found')) {
                setErrorMessage('The email address was not found');
            } else if (error.code.includes('invalid-email')) {
                setErrorMessage('Invalid email');
            } else {
                Alert.alert("An error occurred: " + error);
            }
        });
    };

    return(
        <View style={{alignItems: 'center'}}>
            <Button
                containerStyle={{width: '100%'}}
                style={{padding: 10}}
                icon={<Icon name="ios-key" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                onPress={openHandler}
                title="RESET PASSWORD" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Overlay
                    isVisible={visible}
                    height='50%'
                    onBackdropPress={() => setVisible(false)}
                    overlayStyle={{padding: 0}}
                    overlayBackgroundColor='#f2f2f7'
                >
                    <View style={{flex: 1, height: '100%', width: '100%', alignItems: 'center'}}>
                        <View style={{flex: 2, width: '100%', justifyContent: 'center', backgroundColor: '#2685f8'}}>
                            <Text style={{fontSize: 18, paddingLeft: '3%', color: '#ffffff'}}>
                                Please write your email address
                            </Text>
                        </View>
                        <View style={{flex: 5, width: '85%', justifyContent: 'space-around'}}>
                            <Input
                                placeholder="e-mail"
                                label="Your e-mail address"
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                errorMessage={errorMessage} />
                        </View>
                        <View  style={{flex: 2, justifyContent: 'center'}}>
                            <Button
                                style={{padding: 10}}
                                icon={<Icon name="ios-key" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                                onPress={resetPassword}
                                title="RESET PASSWORD" /> 
                        </View>
                    </View>
                </Overlay>
            </TouchableWithoutFeedback>
        </View>
    );

}