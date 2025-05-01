import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRF_0sxyV762WVBNYxP83ghw-lp9VtmdU",
  authDomain: "saya-e-falah.firebaseapp.com",
  projectId: "saya-e-falah",
  storageBucket: "saya-e-falah.appspot.com",
  messagingSenderId: "595292534511",
  appId: "1:595292534511:web:5dafc7c4f0c4804fc40d1a",
  measurementId: "G-BP8RWQMX1N",
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
