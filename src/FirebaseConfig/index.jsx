import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Настройки конфигурации Firebase
  apiKey: 'AIzaSyCxHT4bGzaKIl8DYK-qwWPuKJAPqlMgaOg',
  authDomain: 'press-e5741.firebaseapp.com',
  databaseURL:
    'https://press-e5741-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'press-e5741',
  storageBucket: 'press-e5741.appspot.com',
  messagingSenderId: '325042443581',
  appId: '1:325042443581:web:96832ff63420bda07a6154',
  // ...
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };

export default firebaseConfig;
