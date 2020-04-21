import React, { useState } from 'react';
import { View, FlatList, Keyboard, Text } from 'react-native';
import { Header, Input, Button, ListItem } from 'react-native-elements';

export default function PasswordList() {
    const [credentialsList, setCredentialsList] = useState([]);

    /*
    const getPassword = () => {
        fetch('')
        .then((response) => response.json())
        .then((responseJSON) => setPassword(responseJSON))
        .catch((error) => Alert.alert('Error', error))
    }
    */

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
                        title={item.username}
                        subtitle={<Text style={{ color: 'grey' }}>{item.password}</Text>}
                        rightElement={
                        <Button
                            title='bought'
                            icon={{ name: 'chevron-right', color: 'grey' }} 
                            iconRight={true}
                            type='clear'
                            titleStyle={{ color: 'grey', fontSize: 16 }}
                            onPress={() => deleteItem(item.key)}
                        />}
                        //bottomDivider
                        ItemSeparatorComponent={listSeparator}
                />
                )}
            />

        </View>
    );
}