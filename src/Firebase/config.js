// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


// console.log(process.env);
// console.log( import.meta.env );


// Your web app's Firebase configuration
//devprod
{/*const firebaseConfig = {
  apiKey: "AIzaSyAL-xvRJKSjPdihY59zQzNus1PZ0Jn4uN4",
  authDomain: "react-curso-carlos.firebaseapp.com",
  projectId: "react-curso-carlos",
  storageBucket: "react-curso-carlos.appspot.com",
  messagingSenderId: "804183926439",
  appId: "1:804183926439:web:54c057b39908e05dbe9d82"
};*/}

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDyLJugXH7YFgmHb-rMLYlxT1YwtkgYR7E",
//   authDomain: "tracker-8f49f.firebaseapp.com",
//   databaseURL: "https://tracker-8f49f.firebaseio.com",
//   projectId: "tracker-8f49f",
//   storageBucket: "tracker-8f49f.appspot.com",
//   messagingSenderId: "145943821416",
//   appId: "1:145943821416:web:12e973eaa8b630a444cfdd"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );

