import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import handleError from '../../utils/error-handler';
import FormTitle from './UI/FormTitle';
import FormButton from './UI/FormButton';
import FormBody from './UI/FormBody';

const auth = getAuth();

export default function UserNew() {
  const [visible, setVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({emailError: '', passwordError: ''});


  const openHandler = () => setVisible(true);

  const signUpHandler = () => {
    setErrors({emailError: '', passwordError: ''});
    createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .catch(error => setErrors(handleError(error.message)));
      })
      .catch(error => setErrors(handleError(error.message)));
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
          onBackdropPress={() => setVisible(false)}
          overlayStyle={styles.overlay}
        >
          <View style={styles.formContainer}>

            <FormTitle title={'Sign up with a new user'} />

            <FormBody userDetails={userDetails} setUserDetails={setUserDetails} errors={errors} />

            <FormButton label={"SIGN UP"} action={signUpHandler} icon={"md-person-add"} />

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
  overlay: {
    marginTop: 45,
    marginBottom: 35,
    padding: 0,
    borderRadius: 20
  }
});
