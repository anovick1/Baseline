<template>
  <div class="home">
    <h1>Baseline</h1>
    <h2 v-if="user">Signed in User: {{ user }}</h2>
    <div id="logout" v-if="isSignedIn">
      <button @click="handleSignOut">Logout</button>
    </div>
    <!-- <div id="TwitterSignIn" v-if="!isSignedIn">
      <h3>Twitter Sign In</h3>
      <button @click="handleSignInTwitter">Login</button>
    </div> -->
    <h3>
      Sign in to charts and compare any NBA player statistics throughout history
    </h3>
    <div id="GoogleSignIn" v-if="!isSignedIn">
      <div class="google-sign-btn" @click="handleSignInGoogle">
        Sign in With Google
      </div>
    </div>
    <!-- <img :src="localStorage.pfp" /> -->
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
import { GetUsers, updateUser, createUser } from '../Services/UserServices'

const googleProvider = new GoogleAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const auth = getAuth()
import firebaseConfig from '../firebaseConfig'
twitterProvider
firebaseConfig

export default {
  name: 'HomePage',
  data() {
    return {
      currentUser: '',
      isSignedIn: null,
      users: []
    }
  },
  mounted: async function () {
    this.users = await GetUsers()
    if (localStorage.email === 'null') {
      this.isSignedIn = false
    } else {
      this.isSignedIn = true
    }
  },
  methods: {
    handleSignInGoogle: async function () {
      signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          this.users = await GetUsers()
          this.currentUser = {
            name: result.user.displayName,
            email: result.user.email,
            pfp: result.user.photoURL
          }
          localStorage.name = result.user.displayName
          localStorage.email = result.user.email
          localStorage.pfp = result.user.photoURL
          this.isSignedIn = true
          let newUser = true
          let id = 0
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === result.user.email) {
              newUser = false
              id = this.users[i].id
            }
          }
          if (newUser === true) {
            let body = {
              name: result.user.displayName,
              email: result.user.email,
              pfp_url: result.user.photoURL
            }
            await createUser(body)
          } else {
            let body = {
              name: result.user.displayName,
              email: result.user.email,
              pfp_url: result.user.photoURL
            }
            await updateUser(id, body)
            location.reload()
            this.isSignedIn = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // handleSignInTwitter() {
    //   signInWithPopup(auth, twitterProvider)
    //     .then((result) => {
    //       // const user = result.user
    //       this.user = result.user.displayedName
    //       this.isSignedIn = true
    //       console.log(result)
    //       console.log(result.user.displayName)
    //       console.log(result.user.email)
    //       console.log(result.user.photoURL)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    handleSignOut() {
      signOut(auth)
        .then(() => {
          this.user = ''
          localStorage.name = null
          localStorage.email = null
          localStorage.pfp = null
          location.reload()
          this.isSignedIn = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
