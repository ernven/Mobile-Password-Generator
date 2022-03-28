import { useState } from 'react';
import { View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseAuth } from '../firebase';

export default function UserNew() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [visible, setVisible] = useState(false);

  const openHandler = () => {
    setVisible(true);
  };

  const signUp = () => {
    setEmailError('');
    setPasswordError('');
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebaseAuth.currentUser.sendEmailVerification()
          .catch((error) => {
            Alert.alert("An error occurred: " + error);
          });
      })
      .catch((error) => {
        if (error.message.includes("formatted")) {
          setEmailError("The email address is not valid");
        } else if (error.message.includes("6 characters")) {
          setPasswordError("Password must be at least 6 characters long");
        } else if (error.message.includes("already")) {
          setEmailError("Email address already in use");
        } else {
          Alert.alert(error.code + ": " + error.message);
        }
      });
  };

  return (
    <View>
      <Button
        buttonStyle={{ backgroundColor: '#51c72a' }}
        style={{ padding: 10 }}
        icon={<Icon name="md-person-add" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
        onPress={openHandler}
        title="NEW USER" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Overlay
          isVisible={visible}
          height='50%'
          onBackdropPress={() => setVisible(false)}
          overlayStyle={{ padding: 0 }}
          overlayBackgroundColor='#f2f2f7'
        >
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <View style={{ flex: 2, width: '100%', justifyContent: 'center', backgroundColor: '#2685f8' }}>
              <Text style={{ fontSize: 18, paddingLeft: '3%', color: '#ffffff' }}>
                Sign up with a new user
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
                style={{ padding: 10 }}
                icon={<Icon name="md-person-add" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
                onPress={signUp}
                title="SIGN UP" />
            </View>
          </View>
        </Overlay>
      </TouchableWithoutFeedback>
    </View>
  );
}
