import React, { useState } from 'react';
import { View } from 'react-native';

export default function PasswordGen() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inclSpecialChars, setInclSpecialChars] = useState(true);
    const [length, setLength] = useState(8);

    const getPassword = () => {
        fetch('')
        .then((response) => response.json())
        .then((responseJSON) => setPassword(responseJSON))
        .catch((error) => Alert.alert('Error', error))
    }

    return (
        <View>

        </View>
    );
}