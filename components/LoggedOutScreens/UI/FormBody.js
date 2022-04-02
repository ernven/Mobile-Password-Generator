import { View } from 'react-native';
import { Input } from 'react-native-elements';

export default function FormBody({ userDetails, setUserDetails, errors }) {

  return (
    <View style={{flex: 4, justifyContent: 'space-evenly'}}>
      <Input
        placeholder='e-mail'
        label='Your e-mail address'
        containerStyle = {{ paddingHorizontal: 0, minWidth: '80%'}}
        textContentType='username'
        keyboardType='email-address'
        onChangeText={newVal => setUserDetails({...userDetails, email: newVal})}
        clearButtonMode='while-editing'
        value={userDetails.email}
        errorMessage={errors.emailError} />
      <Input
        placeholder='Password'
        label='Password'
        containerStyle = {{ paddingHorizontal: 0, minWidth: '80%'}}
        textContentType='password'
        onChangeText={newVal => setUserDetails({...userDetails, password: newVal})}
        clearButtonMode='while-editing'
        value={userDetails.password}
        secureTextEntry={true}
        errorMessage={errors.passwordError} />
    </View>
  )

}
