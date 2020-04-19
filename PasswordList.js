import React, { useState } from 'react';
import { View } from 'react-native';

export default function PasswordList() {
    const [credentialsList, setCredentialsList] = useState([]);

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    };

    return (
        <View>

        </View>
    );
}