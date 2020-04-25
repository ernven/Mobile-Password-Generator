import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Overlay, Header, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListItemDetails(props) {
    const [visible, setVisible] = useState(false);

    const openHandler = () => {
        setVisible(true);
    };

    const confirmDialog = () => {
        Alert.alert(
            "Delete confirmation",
            "Are you sure you want to remove the login details?\nThis action cannot be undone.",
            [
                { text: 'Cancel', style: 'cancel' },
                { text: "OK",
                    style: 'destructive',
                    onPress: () => {
                        setVisible(false);
                        props.deleteItem(props.item.key);
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <View>
            <Button
                buttonStyle={{backgroundColor: 'gray'}}
                icon={<Icon name="md-eye" size={20} style={{paddingLeft: 5, paddingRight: 5}} color="#ffffff" />}
                onPress={openHandler}
            />
            <Overlay
                isVisible={visible}
                height='50%'
                onBackdropPress={() => setVisible(false)}
                overlayStyle={{padding: 0}}
                overlayBackgroundColor='#f2f2f7'
            >
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Header
                        containerStyle={{flex: 1}}
                        leftComponent={{ text: props.item.a, style: { color: '#ffffff', width: 100, fontSize: 25 } }}
                    />
                    <View style={{flex: 3.5, marginTop: '10%', alignItems: 'center'}}>
                        <Text h4>User ID:</Text>
                        <Text h4 style={{ color: 'grey', marginTop: '2%' }} selectable={true}>{props.item.u}</Text>
                        <Text h4 >Password:</Text>
                        <Text h4 style={{ color: 'grey', marginTop: '2%' }} selectable={true}>{props.item.p}</Text>
                    </View>
                    <View style={{flex: 1.5}}>
                        <Button
                            buttonStyle={{backgroundColor: '#d43131', width: '85%', marginLeft: '5%'}}
                            icon={<Icon name="md-trash" size={20} style={{paddingRight: 10}} color="#ffffff" />}
                            onPress={confirmDialog}
                            title="DELETE ENTRY"
                        />
                    </View>
                </View>
            </Overlay>
        </View>
    );
}