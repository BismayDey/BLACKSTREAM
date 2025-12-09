import { initializeApp, getApps } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ-Uwme2vUeoeNdUghhByiA2F4jtm6gvo",
  authDomain: "streaming-f49c1.firebaseapp.com",
  projectId: "streaming-f49c1",
  storageBucket: "streaming-f49c1.firebasestorage.app",
  messagingSenderId: "146128126675",
  appId: "1:146128126675:web:31e47056dcf37095440a26",
}

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(firebaseApp)

// Set persistence to LOCAL (keeps user logged in forever until they sign out)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error)
})
export const db = getFirestore(firebaseApp)

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.')
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.')
  }
})
export const storage = getStorage(firebaseApp)

// Export the app as both default and named export
export const app = firebaseApp
export default firebaseApp
