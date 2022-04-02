import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Overlay, Header, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListItemDetails({ item, deleteItem }) {
  const [visible, setVisible] = useState(false);

  const openHandler = () => setVisible(true);

  const confirmDialog = () => {
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to remove the login details?\nThis action cannot be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: "OK",
          style: 'destructive',
          onPress: () => {
            setVisible(false);
            deleteItem(item.key);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Button
        buttonStyle={{ backgroundColor: 'gray' }}
        icon={<Icon name="md-eye" size={20} style={styles.buttonIcon} color="#ffffff" />}
        onPress={openHandler}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={styles.overlay}
      >
        <View style={styles.container}>
          <Header
            containerStyle={{ marginTop: '25%', backgroundColor: '#0065ca' }}
            centerComponent={{ text: item.name, style: styles.headerText }}
          />
          <View style={styles.body}>
            <Text h4>User ID</Text>
            <Text h4 style={styles.bodyText} selectable={true}>{item.username}</Text>
            <Text h4 >Password</Text>
            <Text h4 style={styles.bodyText} selectable={true}>{item.password}</Text>
          </View>
          <View style={{ flex: 1.5 }}>
            <Button
              buttonStyle={styles.deleteButton}
              icon={<Icon name="md-trash" size={20} style={{ paddingRight: 10 }} color="#ffffff" />}
              onPress={confirmDialog}
              title="DELETE ENTRY"
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {
    paddingHorizontal: 5
  },
  overlay: {
    marginTop: 32,
    marginBottom: 45,
    marginHorizontal: 35,
    padding: 0,
    borderRadius: 20
  },
  container: {
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 45,
    paddingVertical: '25%'
  },
  body: {
    paddingVertical: '5%',
    paddingTop: '30%',
    alignItems: 'center'
  },
  bodyText: {
    color: 'grey',
    marginBottom: '25%'
  },
  deleteButton: {
    backgroundColor: '#d43131',
    width: '95%'
  }
});
