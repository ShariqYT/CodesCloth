import { initializeApp } from "firebase/app";
import 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "codescloth-c2255.appspot.com",
  messagingSenderId: "167453831643",
  appId: "1:167453831643:web:54c9510023599f9111f7fe",
  measurementId: "G-5H5G09087Y"
};

const app = initializeApp(firebaseConfig);
export {app}