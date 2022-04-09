import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import handleError from '../../utils/error-handler';
import FormTitle from './UI/FormTitle';
import FormButton from './UI/FormButton';

const auth = getAuth();

export default function ListItemDetails() {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openHandler = () => setVisible(true);

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset Confirmation",
          "An email has been sent to your address with instructions on how to reset your password.",
          [{ text: "OK", onPress: () => setVisible(false) }]
        );
      })
      .catch(error => setErrorMessage(handleError(error)));
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        containerStyle={{ width: '100%' }}
        style={{ padding: 10 }}
        icon={<Icon name="ios-key" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
        onPress={openHandler}
        title="RESET PASSWORD" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Overlay
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          overlayStyle={styles.overlay}
        >
          <View style={styles.formContainer}>

            <FormTitle title={'Please write your email address'} />

            <View style={styles.inputContainer}>
              <Input
                placeholder="e-mail"
                label="Your e-mail address"
                containerStyle = {{ paddingHorizontal: 0, minWidth: '80%'}}
                textContentType="username"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
                clearButtonMode="while-editing"
                value={email}
                errorMessage={errorMessage} />
            </View>
            
            <FormButton label={"RESET PASSWORD"} action={resetPassword} icon={"ios-key"} />

          </View>
        </Overlay>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center'
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'space-evenly'
  },
  overlay: {
    marginTop: 45,
    marginBottom: 35,
    padding: 0,
    borderRadius: 20
  }
});
