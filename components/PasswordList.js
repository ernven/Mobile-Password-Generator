import React, { useState } from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import { Header, Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth, firebaseDB } from './firebase';

export default function PasswordList() {
    const [credentialsList, setCredentialsList] = useState([]);

    React.useEffect(() => {
        firebaseDB.ref('/users/' + firebaseAuth.currentUser.uid).on('value', snapshot => {
            const data = snapshot.val();
            if (data != undefined && data != null) {
                const details = Object.entries(data).map(item => ({...item[1], key: item[0]}));
                setCredentialsList(details);
            } else {
                setCredentialsList([]);
            }
        });
    }, []);

    const deleteItem = (key) => {
        Alert.alert(
            "Delete confirmation",
            "Are you sure you want to remove the login details?\nThis action cannot be undone.",
            [
                {text: 'Cancel', style: 'cancel'},
                {text: "OK",
                    style: 'destructive',
                    onPress: () => {                
                        firebaseDB.ref('/users/' + firebaseAuth.currentUser.uid + '/' + key).remove();
                        Alert.alert("Login details removed!");
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <View style={{height: '100%', flex: 1}}>
            <Header
                containerStyle={{backgroundColor: '#141414'}}
                barStyle="light-content"
                centerComponent={{ text: 'PASSWORD LIST', style: { color: '#ffffff', fontWeight: '600' } }}
            />
            <FlatList
                style={{margin: '5%'}}
                containerStyle={{backgroundColor: 'transparent'}}
                data={credentialsList}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                    <ListItem
                        title={item.a}
                        subtitle={<Text style={{ color: 'grey' }}>{item.u}     {item.p}</Text>}
                        rightElement={
                            <Button
                                buttonStyle={{backgroundColor: '#d43131'}}
                                icon={<Icon name="md-trash" size={20} color="#ffffff" />}
                                onPress={() => deleteItem(item.key)} />
                        }
                        bottomDivider
                />
                )}
            />

        </View>
    );
}