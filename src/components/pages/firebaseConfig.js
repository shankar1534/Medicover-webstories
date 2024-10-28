// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRVp33xOvZ8M71ZDWqOO9HgfGZknQSNNU",
  authDomain: "webstories-21f79.firebaseapp.com",
  projectId: "webstories-21f79",
  storageBucket: "webstories-21f79.appspot.com",
  messagingSenderId: "326017046153",
  appId: "1:326017046153:web:461cedaa396b251fd6d858",
  measurementId: "G-4F2ZYXZ06D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
