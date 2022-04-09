import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PasswordGen from './PasswordGen';
import PasswordList from './PasswordList';
import UserDetails from './UserDetails';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'New Credentials') {
              iconName = focused ? 'ios-add-circle-outline' : 'ios-add-circle-outline';
            } else if (route.name === 'Password List') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'User Details') {
              iconName = focused ? 'ios-person-circle-outline' : 'ios-person-circle-sharp';
            }
            return <Icon name={iconName} size={30} style={{ paddingTop: 4 }} color={color} />;
          },
          tabBarActiveTintColor: "#2685f8",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name="New Credentials" options={headerOptions} component={PasswordGen} />
        <Tab.Screen name="Password List" options={headerOptions} component={PasswordList} />
        <Tab.Screen name="User Details" options={headerOptions} component={UserDetails} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const headerOptions = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontSize: 20,
    color: '#2685f8'
  },
}
