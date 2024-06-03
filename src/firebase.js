import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkcCIjN4Cv6XfvaUAys0i9rmQ7nVKany4",
  authDomain: "dental-aaup.firebaseapp.com",
  projectId: "dental-aaup",
  storageBucket: "dental-aaup.appspot.com",
  messagingSenderId: "141262709603",
  appId: "1:141262709603:web:6d6614b655d1892cb7e956",
  measurementId: "G-5PZSNLNFB6"
};
export const firestore = getFirestore(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);