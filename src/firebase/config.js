import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUUsvQnNXfW5NyEJqibTdl5aLOL_Q6fW0",
    authDomain: "olx-clone-1c222.firebaseapp.com",
    projectId: "olx-clone-1c222",
    storageBucket: "olx-clone-1c222.appspot.com",
    messagingSenderId: "144809917177",
    appId: "1:144809917177:web:ecbbd26ddc949d521f4028"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, phone, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      username,
      email,
      phone,
      authProvider: 'local'
    });
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
}

export { auth, db, signup, login };
