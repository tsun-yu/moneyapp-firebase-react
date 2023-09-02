import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6fiBvFHbgrWGrGW0gD044IDlyy7aloKo",
  authDomain: "crud-testing-c6f10.firebaseapp.com",
  projectId: "crud-testing-c6f10",
  storageBucket: "crud-testing-c6f10.appspot.com",
  messagingSenderId: "649401055856",
  appId: "1:649401055856:web:6ba3018a9b2db04b2112b5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }

// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
