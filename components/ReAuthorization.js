import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseEmailAuthProvider } from './firebase';

export default function ListItemDetails(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createCredentials = () => {
        var credentials = firebaseEmailAuthProvider.credential(email, password);
        props.reAuthorize(credentials);
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1, height: '100%', width: '100%', alignItems: 'center'}}>
                <View style={{flex: 2, width: '100%', justifyContent: 'center', backgroundColor: 'black'}}>
                    <Text style={{fontSize: 18, paddingLeft: '3%', color: '#ffffff'}}>
                        Please confirm your credentials
                    </Text>
                </View>
                <View style={{flex: 5, width: '85%', justifyContent: 'space-around'}}>
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
                <View  style={{flex: 2, justifyContent: 'center'}}>
                    <Button
                        icon={<Icon name="ios-log-in" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                        onPress={createCredentials}
                        title="SIGN IN" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

}