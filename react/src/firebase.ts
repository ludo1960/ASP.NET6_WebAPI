// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu-c6eZRR3T3QJoCKyoYcF57Uop0XuNhg",
  authDomain: "bmgresearch-77efb.firebaseapp.com",
  databaseURL: "https://bmgresearch-77efb-default-rtdb.firebaseio.com",
  projectId: "bmgresearch-77efb",
  storageBucket: "bmgresearch-77efb.appspot.com",
  messagingSenderId: "761617666181",
  appId: "1:761617666181:web:4c93e1158e3208891f99ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const databaseRef = getDatabase(app);
export const usersRef = ref(databaseRef, "users");
export const inMeetingRef = ref(databaseRef, "users/IN_MEETING");
export const onCallRef = ref(databaseRef, "users/ON_CALL");
export const onBreakRef = ref(databaseRef, "users/ON_BREAK");