import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuD09dRhcS-p8qiHqZnDVd9DO8gFzQZj8",
  authDomain: "dentalclinicaaup-aa0f1.firebaseapp.com",
  projectId: "dentalclinicaaup-aa0f1",
  storageBucket: "dentalclinicaaup-aa0f1.appspot.com",
  messagingSenderId: "59236203586",
  appId: "1:59236203586:web:c5008a310c799e45fe41db"
};


const app = initializeApp(firebaseConfig);
 export const firestore= getFirestore(app);