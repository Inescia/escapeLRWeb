// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqPkqCjyQItaItaAd5klkhWx325VfAHSo',
  authDomain: 'escape-lr.firebaseapp.com',
  projectId: 'escape-lr',
  storageBucket: 'escape-lr.firebasestorage.app',
  messagingSenderId: '623889819961',
  appId: '1:623889819961:web:0d330ab26bd7c77a40e0e8',
  measurementId: 'G-W02PMS2VBG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getFirestore(app)
const authentification = getAuth(app)

export { analytics, authentification, database }
