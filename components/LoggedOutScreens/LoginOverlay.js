import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

import handleError from '../../utils/error-handler';
import FormTitle from './UI/FormTitle';
import FormBody from './UI/FormBody';
import FormButton from './UI/FormButton';

const auth = getAuth();

export default function LoginOverlay({ isCancellable, reAuthorize }) {
  const [visible, setVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({emailError: '', passwordError: ''});

  const openHandler = () => setVisible(true);

  useEffect(() => {
    if (reAuthorize) {
      setVisible(true)
    }
  }, [reAuthorize]);

  const loginHandler = () => {
    setErrors({emailError: '', passwordError: ''});
    if (typeof reAuthorize !== 'undefined') {

      // Auth with credentials. Can be made straight with email, pwd.
      const credentials = EmailAuthProvider.credential(userDetails.email, userDetails.password);

      reauthenticateWithCredential(auth.currentUser, credentials)
        .then(() => reAuthorize())
        .catch(error => setErrors(handleError(error.message)));
        
    } else {
      signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        .catch(error => setErrors(handleError(error.message)));
    }
  };

  return (
    <View>

      {!reAuthorize ?
        <Button
          style={{padding: 10}}
          containerStyle={{ width: '100%' }}
          icon={<Icon name="ios-log-in" size={20} style={{paddingRight: 10}} color="#ffffff" />}
          onPress={openHandler}
          title="SIGN IN" /> : null}
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Overlay
          isVisible={visible}
          onBackdropPress={() => { if (isCancellable) { setVisible(false) } }}
          overlayStyle={styles.overlay}
        >
          <View style={styles.form}>

          <FormTitle title={'Please confirm your credentials'} />

          <FormBody userDetails={userDetails} setUserDetails={setUserDetails} errors={errors} />

          <FormButton label={"SIGN IN"} action={loginHandler} icon={"ios-log-in"} />
        </View>
        </Overlay>
          
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center'
  },
  overlay: {
    marginTop: 45,
    marginBottom: 35,
    padding: 0,
    borderRadius: 20
  }
});
