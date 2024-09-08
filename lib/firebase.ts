// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP8PkUUFx6MioeL7vTe3kywK-Z9iQ69qI",
  authDomain: "ecommerce-app-81d1b.firebaseapp.com",
  projectId: "ecommerce-app-81d1b",
  storageBucket: "ecommerce-app-81d1b.appspot.com",
  messagingSenderId: "433825386351",
  appId: "1:433825386351:web:cc067b8b0f7ca144d0629a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;