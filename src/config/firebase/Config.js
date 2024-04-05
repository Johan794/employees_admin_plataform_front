import { initializeApp } from "firebase/app";
import {getStorage, ref , uploadBytes, getDownloadURL} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtYRrxxsC4KT98-yzBl8AZ6GMGmJV5VTE",
  authDomain: "employees-photo-data.firebaseapp.com",
  projectId: "employees-photo-data",
  storageBucket: "employees-photo-data.appspot.com",
  messagingSenderId: "281005271432",
  appId: "1:281005271432:web:4a99b8a62648c45f87723d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFile(file){
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file)
   const fileRef =  await getDownloadURL(storageRef)
   console.log(fileRef);  
   return fileRef;
}