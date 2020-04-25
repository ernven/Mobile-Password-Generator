import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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
        <View style={{flex: 1, height: '100%', width: '100%', alignItems: 'center'}}>
            <Text style={{flex: 1, width: '80%', fontSize: 18, color: '#2685f8', marginTop: '12%'}}>Please confirm your credentials</Text>
            <View style={{flex: 3, width: '85%', justifyContent: 'space-around'}}>
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
    );

}