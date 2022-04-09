import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FormButton({ label, action, icon }) {
  return (
    <View style={{ flex: 2, justifyContent: 'center' }}>
      <Button
        icon={<Icon name={icon} size={20} style={{paddingRight: 10}} color="#ffffff" />}
        onPress={action}
        title={label}
        style={{minWidth: '65%'}}
      />
    </View>
  );
}
