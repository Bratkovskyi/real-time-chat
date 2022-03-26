import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app'
// import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore"

// firebase.initializeApp({
//   apiKey: "AIzaSyDuRJINf9QjQMns2vw88nhve6_354wszf8",
//   authDomain: "chat-react-afc43.firebaseapp.com",
//   projectId: "chat-react-afc43",
//   storageBucket: "chat-react-afc43.appspot.com",
//   messagingSenderId: "655904985542",
//   appId: "1:655904985542:web:9fe62768962a5b82b2a2c7",
//   measurementId: "G-EJ2JKEN7F8"
// })

// export const Context = createContext(null)


// const auth = getAuth()
// console.log(getAuth())
// const firestore = firebase.default.firestore


const firebaseConfig = {
  apiKey: "AIzaSyDuRJINf9QjQMns2vw88nhve6_354wszf8",
  authDomain: "chat-react-afc43.firebaseapp.com",
  projectId: "chat-react-afc43",
  storageBucket: "chat-react-afc43.appspot.com",
  messagingSenderId: "655904985542",
  appId: "1:655904985542:web:9fe62768962a5b82b2a2c7",
  measurementId: "G-EJ2JKEN7F8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
