import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function FormTitle({ title }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#0065ca',
    marginTop: '25%'
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: '25%'
  }
});
