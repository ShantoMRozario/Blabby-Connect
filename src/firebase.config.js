// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-E9vsehJgLNTUjbY5t9DqdYkW9XKJCu4",
  authDomain: "blabbyconnect.firebaseapp.com",
  projectId: "blabbyconnect",
  storageBucket: "blabbyconnect.appspot.com",
  messagingSenderId: "432780956067",
  appId: "1:432780956067:web:8c66a7dfdf3833cd5c4a16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig; 