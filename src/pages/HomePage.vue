<template>
  <div class="home">
    <h1>Baseline</h1>
    <h2 v-if="user">Signed in User: {{ user }}</h2>
    <div id="logout" v-if="isSignedIn">
      <button @click="handleSignOut">Logout</button>
    </div>
    <div id="GoogleSignIn" v-if="!isSignedIn">
      <h3>Google Sign In</h3>
      <button @click="handleSignInGoogle">Login</button>
    </div>
    <div id="TwitterSignIn" v-if="!isSignedIn">
      <h3>Twitter Sign In</h3>
      <button @click="handleSignInTwitter">Login</button>
    </div>
    <h3>Create charts to compare any player in NBA history</h3>
    <img
      src="https://i.etsystatic.com/24759709/r/il/2decdd/2605299704/il_fullxfull.2605299704_9ss2.jpg"
    />
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()
const twitterProvider = new TwitterAuthProvider()
const auth = getAuth()
import firebaseConfig from '../firebaseConfig'

firebaseConfig
export default {
  name: 'HomePage',
  data() {
    return {
      user: '',
      isSignedIn: false
    }
  },
  methods: {
    handleSignInGoogle() {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // const user = result.user
          this.user = result.user.displayedName
          this.isSignedIn = true
          console.log(result)
          console.log(result.user.displayName)
          console.log(result.user.email)
          console.log(result.user.photoURL)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSignInTwitter() {
      signInWithPopup(auth, twitterProvider)
        .then((result) => {
          // const user = result.user
          this.user = result.user.displayedName
          this.isSignedIn = true
          console.log(result)
          console.log(result.user.displayName)
          console.log(result.user.email)
          console.log(result.user.photoURL)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSignOut() {
      signOut(auth)
        .then(() => {
          this.user = ''
          this.isSignedIn = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
