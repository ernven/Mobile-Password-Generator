import React, { useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Header, ListItem, Text } from 'react-native-elements';

import { firebaseAuth, firebaseDB } from './firebase';
import ListItemDetails from './ListItemDetails';

var moment = require('moment');

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
                data={credentialsList}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                    <ListItem
                        containerStyle={{backgroundColor: 'transparent'}}
                        title={item.a}
                        titleStyle={{color: 'gray', fontSize: 24}}
                        subtitle={
                            <View>
                                <Text style={{ color: '#d43131', paddingTop: '2%', paddingBottom: '2%'}}>Created {moment(item.d).fromNow()}</Text>
                            </View>
                        }
                        rightElement={() => <ListItemDetails item={item} deleteItem={deleteItem} />}
                        bottomDivider
                />
                )}
            />

        </View>
    );
}