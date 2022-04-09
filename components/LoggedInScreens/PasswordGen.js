import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Divider, Button, CheckBox, Text } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const db = getDatabase();


// First provider uses url like https://password.markei.nl/random.json?symbols=false&min=8&max=8
// Second provider uses this https://api.random.org/json-rpc/2/invoke and some request parameters
// I have used the second for this project. The personal apiKey is removed for publishing of source code.

const apiUrl = 'https://api.random.org/json-rpc/2/invoke';

export default function PasswordGen() {
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    username: '',
    password: ''
  })
  const [alphanumOnly, setAlphanumOnly] = useState(false);
  const [length, setLength] = useState(12);
  const [accNameError, setAccNameError] = useState('');

  const url = '/users/' + auth.currentUser.uid;

  useEffect(() => setPassword(), []);

  const getPassword = async () => {

    let characters = alphanumOnly ?
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' :
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*()=-_.';

    const { result, error } = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'generateStrings',
          'params': {
            'apiKey': '',
            'n': 1,
            'length': length,
            'characters': characters
          },
          'id': 100
        })
      })
      .then(response => response.json())

    if (error) {
      console.log(error);
      return '';
    }

    if (result?.random?.data[0]) {
      return (result.random.data[0]);
    }
  };

  const setPassword = async () => {
    const password = await getPassword();
    setAccountDetails({...accountDetails, password: password});
  }

  const saveAccount = async () => {
    if (accountDetails.name === '') {
      setAccNameError('The account name cannot be empty.');
    } else {
      const currDate = new Date().toISOString();
      const entry = {...accountDetails, date: currDate};
      
      await push(ref(db, url), entry);

      return handleAuthSuccess();
    }
  };

  const handleAuthSuccess = () => {

    setAccountDetails({
      name: '',
      username: '',
      password: ''
    });

    setAccNameError('');

    Keyboard.dismiss;
    Alert.alert('Success', 'The login details have been saved.');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, height: '100%' }}>

        <View style={styles.inputContainer}>
          <Input
            placeholder='Enter the service provider'
            label='Account Name'
            onChangeText={newVal => setAccountDetails({...accountDetails, name: newVal})}
            value={accountDetails.name}
            errorMessage={accNameError} />
          <Input
            placeholder='Enter your username or email'
            label='User ID'
            onChangeText={newVal => setAccountDetails({...accountDetails, username: newVal})}
            value={accountDetails.username} />
          <Input
            label='Password'
            disabled={true}
            value={accountDetails.password} />
          <CheckBox
            title='Letters and numbers only'
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: '6%' }}
            textStyle={{ color: 'gray' }}
            iconType='material'
            checkedIcon='check-box'
            uncheckedIcon='check-box-outline-blank'
            checkedColor='green'
            checked={alphanumOnly}
            onPress={() => setAlphanumOnly(!alphanumOnly)} />

          <Text style={{ color: 'gray' }}>Password length:</Text>
          <Slider
            minimumValue={8}
            maximumValue={24}
            step={1}
            thumbTintColor='#141414'
            style={{paddingVertical: '8%'}}
            value={length}
            onValueChange={length => setLength(length)} />
          <Text style={{ color: 'gray' }}>Current: {length}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{ backgroundColor: '#51c72a' }}
            style={{ padding: 10 }}
            icon={<Icon name='md-refresh' size={20} style={{ paddingRight: 10 }} color='#ffffff' />}
            onPress={setPassword}
            title='Generate New' />
        <Divider style={styles.divider} />
          <Button
            style={{ padding: 10, borderRadius: 20 }}
            icon={<Icon name='md-save' size={20} style={{ paddingRight: 10 }} color='#ffffff' />}
            onPress={saveAccount}
            title='Save Details' />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: '10%',
    marginHorizontal: '5%'
  },
  buttonContainer: {
    marginHorizontal: '7%'
  },
  divider: {
    backgroundColor: 'gray',
    marginHorizontal: '3%',
    marginVertical: '5%'
  }
});
