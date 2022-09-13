<template>
  <div class="home">
    <h1>Baseline</h1>
    <!-- <div id="logout" v-if="isSignedIn">
      <button @click="handleSignOut">Logout</button>
    </div> -->
    <!-- <div id="TwitterSignIn" v-if="!isSignedIn">
      <h3>Twitter Sign In</h3>
      <button @click="handleSignInTwitter">Login</button>
    </div> -->
    <div id="GoogleSignIn-nav" v-if="!isSignedIn && mobile">
      <div class="google-sign-btn" @click="handleSignInGoogle">
        <img
          referrerpolicy="no-referrer"
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
        />
        <p>Sign in with Google</p>
      </div>
    </div>
    <div v-if="!isSignedIn">
      <h3>
        Sign in to create charts and compare any NBA player's season statistics
        throughout history
      </h3>
    </div>
    <h3 v-if="isSignedIn">Welcome, {{ currentUser.name }}!</h3>
    <p v-if="isSignedIn">Go make some charts!</p>
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
import { animate, spring } from 'motion'
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
      currentUser: {
        name: localStorage.name,
        email: localStorage.email,
        pfp: localStorage.pfp
      },
      isSignedIn: null,
      users: [],
      mobile: window.innerWidth < 600
    }
  },
  mounted: async function () {
    this.users = await GetUsers()
    if (localStorage.email === 'null') {
      this.isSignedIn = false
    } else {
      this.isSignedIn = true
    }
    const animation = animate(
      '.google-sign-btn',
      { scale: 1.05 },
      {
        duration: 1,
        easing: spring(),
        repeat: Infinity,
        direction: 'alternate'
      }
    )

    animation
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
            let user_id = await createUser(body)
            localStorage.id = user_id.id
            // console.log(localStorage.id)
            location.reload()
            this.isSignedIn = true
          } else {
            let body = {
              name: result.user.displayName,
              email: result.user.email,
              pfp_url: result.user.photoURL
            }
            let user_id = await updateUser(id, body)
            localStorage.id
            localStorage.id = user_id.id
            location.reload()
            this.isSignedIn = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSignOut() {
      signOut(auth)
        .then(() => {
          localStorage.name = null
          localStorage.email = null
          localStorage.pfp = null
          localStorage.id = null
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
