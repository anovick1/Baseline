import { initializeApp } from 'firebase/app'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7clPnORisNy-_ovqlpLAVQ4d_xIyz1Is',
  authDomain: 'baselinenovick.firebaseapp.com',
  projectId: 'baselinenovick',
  storageBucket: 'baselinenovick.appspot.com',
  messagingSenderId: '561619015565',
  appId: '1:561619015565:web:2343bb5f1c56a57f6ccfc4',
  measurementId: 'G-WMRFZZP107'
}

const app = initializeApp(firebaseConfig)

export default app
