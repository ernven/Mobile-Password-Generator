import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';

import Title from './UI/Title';

export default function LocalAuth({ handleAuthSuccess, user }) {
  const [trigger, setTrigger] = useState(true);

  const options = { promptMessage: "Please authenticate to unlock" };

  // With this function we handle the local auth
  // using the device's biometric auth or passcode (as available)
  useEffect(() => {
    const auth = async () => {
      const result = await LocalAuthentication.authenticateAsync(options);
      if (result.success) {
        handleAuthSuccess();
      }
    };
    if (user !== null) {
      auth();
    }
  }, [trigger, user]);

  return (
    <View style={styles.container}>
      
      <Title keyword={'authorize'} />

      <View style={{ flex: 5 }}>
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          icon={<Icon name="md-finger-print" size={45} color="#ffffff" />}
          onPress={() => setTrigger(!trigger)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})
