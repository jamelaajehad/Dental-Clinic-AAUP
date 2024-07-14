import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkcCIjN4Cv6XfvaUAys0i9rmQ7nVKany4",
  authDomain: "dental-aaup.firebaseapp.com",
  projectId: "dental-aaup",
  storageBucket: "dental-aaup.appspot.com",
  messagingSenderId: "141262709603",
  appId: "1:141262709603:web:6d6614b655d1892cb7e956",
  measurementId: "G-5PZSNLNFB6",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, analytics, auth, storage };
