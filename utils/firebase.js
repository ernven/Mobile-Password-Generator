import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// Workarounds until firebase updates the latest AsyncStorage
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
