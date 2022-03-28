import { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseEmailAuthProvider } from './firebase';

export default function ListItemDetails(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginHandler = () => {
    setEmailError('');
    setPasswordError('');
    if (typeof props.authorized !== 'undefined') {
      const credentials = firebaseEmailAuthProvider.credential(email, password);
      props.firebaseAuth.currentUser.reauthenticateWithCredential(credentials)
        .then(() => {
          props.authorized();
        })
        .catch((error) => catchErrors(error));
    } else if (typeof props.firebaseAuth !== 'undefined') {
      props.firebaseAuth.signInWithEmailAndPassword(email, password)
        .catch((error) => catchErrors(error));
    }
  };

  const catchErrors = (error) => {
    if (error.code.includes("email")) {
      setEmailError("The email address is not valid");
    } else if (error.message.includes("user record")) {
      setEmailError("Email address not found");
    } else if (error.code.includes("wrong-password")) {
      setPasswordError("Password does not match");
    } else {
      Alert.alert('Error', error.message);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center' }}>
        <View style={{ flex: 2, width: '100%', justifyContent: 'center', backgroundColor: '#2685f8' }}>
          <Text style={{ fontSize: 18, paddingLeft: '3%', color: '#ffffff' }}>
            Please confirm your credentials
          </Text>
        </View>
        <View style={{ flex: 5, width: '85%', justifyContent: 'space-around' }}>
          <Input
            placeholder="e-mail"
            label="Your e-mail address"
            onChangeText={(email) => setEmail(email)}
            value={email}
            errorMessage={emailError} />
          <Input
            placeholder="Password"
            label="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
            errorMessage={passwordError} />
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Button
            icon={<Icon name="ios-log-in" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
            onPress={loginHandler}
            title="SIGN IN" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
