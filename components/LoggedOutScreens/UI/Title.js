import { View, StyleSheet, Text } from 'react-native';

export default function Title({ keyword }) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Password</Text>
        <Text style={styles.title}>Generator</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>Please {keyword} to continue</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: '40%',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 48
  },
  bodyContainer: {
    alignItems: 'center',
    marginVertical: '25%'
  },
  body: {
    fontSize: 16
  }
});
