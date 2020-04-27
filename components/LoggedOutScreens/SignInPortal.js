import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Divider, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from '../firebase';
import LoginOverlay from '../LoginOverlay';
import UserNew from './UserNew';
import ResetPassword from './ResetPassword';

export default function UserLogin() {
    const [loginVisible, setLoginVisible] = useState(false);

    const openHandler = () => {
        setLoginVisible(true);
    };

    return (
        <View style={{flex: 1,height: '100%', alignItems: 'center', backgroundColor: 'black'}}>
            <View style={{flex: 3, marginTop: '33%'}}>
                <Text style={{ color: '#ffffff', fontStyle: 'italic', fontSize: 48}}>Password</Text>
                <Text style={{color: '#ffffff', fontStyle: 'italic', fontSize: 48}}>Generator</Text>
            </View>
            <View style={{flex: 1.5}}>
                <Text style={{color: '#ffffff', fontSize: 16}}>Please sign in to continue</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{padding: 10}}
                    icon={<Icon name="ios-log-in" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                    onPress={openHandler}
                    title="SIGN IN" />
                <ResetPassword firebaseAuth={firebaseAuth} />
                <Divider style={styles.divider} />
                <UserNew firebaseAuth={firebaseAuth} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <Overlay
                        isVisible={loginVisible}
                        height='50%'
                        onBackdropPress={() => setLoginVisible(false)}
                        overlayStyle={{padding: 0}}
                        overlayBackgroundColor='#f2f2f7'
                    >
                        <LoginOverlay firebaseAuth={firebaseAuth} />        
                    </Overlay>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
      flex: 5,
      justifyContent: "space-evenly",
      width: '60%',
      marginBottom: '15%'
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 20,
        marginRight: 20,
    }
  });