import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6fkyBnAa_S-9xC1kFJiHmXo6g9XkqCSE",
  authDomain: "voting-poll-project.firebaseapp.com",
  projectId: "voting-poll-project",
  storageBucket: "voting-poll-project.firebasestorage.app",
  messagingSenderId: "361538586854",
  appId: "1:361538586854:web:00f30ba8ef2ad3b0555327",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
