import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

import LoginOverlay from './LoginOverlay';
import UserNew from './UserNew';
import ResetPassword from './ResetPassword';
import Title from './UI/Title';

export default function UserLogin() {

  return (
    <View styles={{backgroundColor: 'black'}}>

      <Title keyword={'sign in'} />

      <View style={styles.buttonContainer}>
        
        <LoginOverlay isCancellable={true} />
        <ResetPassword />
        <Divider style={styles.divider} />
        <UserNew />

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '80%',
    marginLeft: '10%'
  },
  divider: {
    backgroundColor: 'gray',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  }
});
