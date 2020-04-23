import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoadingScreen(props) {

    return (
        <View style={{flex: 1,height: '100%', alignItems: 'center', backgroundColor: 'black'}}>
        <View style={{flex: 3, marginTop: '33%'}}>
            <Text style={{ color: '#ffffff', fontStyle: 'italic', fontSize: 48}}>Password</Text>
            <Text style={{color: '#ffffff', fontStyle: 'italic', fontSize: 48}}>Generator</Text>
        </View>
        <View style={{flex: 0.7}}>
            <Text style={{color: '#ffffff', fontSize: 16}}>Please authorize to continue</Text>
        </View>
        <View style={{flex: 5}}>
            <Button
                buttonStyle={{backgroundColor: 'transparent'}}
                icon={<Icon name="md-finger-print" size={45} color="#ffffff" />}
                onPress={props.authorize}
            />
        </View>
        </View>
    );

}