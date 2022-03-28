import { useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Header, ListItem, Text } from 'react-native-elements';

import { firebaseDB } from '../firebase';
import ListItemDetails from './ListItemDetails';

var moment = require('moment');

export default function PasswordList(props) {
  const [credentialsList, setCredentialsList] = useState([]);

  const url = '/users/' + props.route.params.uid;

  React.useEffect(() => fetchAccounts(), []);

  const fetchAccounts = () => {
    firebaseDB.ref(url).on('value', snapshot => {
      const data = snapshot.val();
      if (data != undefined && data != null) {
        const details = Object.entries(data).map(item => ({ ...item[1], key: item[0] }));
        setCredentialsList(details);
      } else {
        setCredentialsList([]);
      }
    });
  };

  const deleteItem = async (key) => {
    await firebaseDB.ref(url + '/' + key).remove();
    fetchAccounts();
    Alert.alert("Success", "Login details removed");
  }

  return (
    <View style={{ height: '100%', flex: 1 }}>
      <Header
        containerStyle={{ backgroundColor: '#141414' }}
        barStyle="light-content"
        centerComponent={{ text: 'PASSWORD LIST', style: { color: '#ffffff', fontWeight: '600' } }}
      />
      <FlatList
        style={{ margin: '5%' }}
        data={credentialsList}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={{ backgroundColor: 'transparent' }}
            title={item.a}
            titleStyle={{ color: 'gray', fontSize: 24 }}
            subtitle={
              <View>
                <Text style={{ color: '#d43131', paddingTop: '2%', paddingBottom: '2%' }}>Created {moment(item.d).fromNow()}</Text>
              </View>
            }
            rightElement={() => <ListItemDetails item={item} deleteItem={deleteItem} />}
            bottomDivider
          />
        )}
      />

    </View>
  );
}
