import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyCqqu6EB6JzLrbBHSCoFKqw_LfEkrkCrA0",
  authDomain: "failforward-39fd5.firebaseapp.com",
  projectId: "failforward-39fd5",
  storageBucket: "failforward-39fd5.firebasestorage.app",
  messagingSenderId: "666032635764",
  appId: "1:666032635764:web:c5bbd0a8557ef8f6367621",
  measurementId: "G-2YJT6FM7GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
