import { useState, useEffect } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import ListItemDetails from './ListItemDetails';

import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const db = getDatabase();

const moment = require('moment');

export default function PasswordList() {
  const [accountList, setAccountList] = useState([]);

  const url = '/users/' + auth.currentUser.uid;

  useEffect(() => fetchAccounts(), []);

  const fetchAccounts = () => {
    const dataRef = ref(db, url);
    onValue(
      dataRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const details = Object.entries(data).map(item => ({...item[1], key: item[0]}));

          setAccountList(details);
        } else {
          setAccountList([]);
        }
      },
      error => console.log(error)
    );
  };

  const listItem = ({ item }) => (
    <ListItem
      containerStyle={{ backgroundColor: 'transparent' }}
      bottomDivider
      onRefresh={() => fetchAccounts()}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: 'gray', fontSize: 24 }}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          Created {moment(item.date).fromNow()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItemDetails item={item} deleteItem={deleteItem} />
    </ListItem>
  )

  const deleteItem = async (key) => {
    const itemRef = ref(db, url + '/' + key);
    await remove(itemRef);
    fetchAccounts();
    Alert.alert("Success", "Login details removed");
  }

  return (
    <View style={{ height: '100%', flex: 1 }}>
      <FlatList
        style={{ margin: '5%' }}
        data={accountList}
        keyExtractor={item => item.key}
        renderItem={listItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#d43131',
    paddingTop: '2%',
    paddingBottom: '2%'
  }
})
