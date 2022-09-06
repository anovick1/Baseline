<template>
  <header>
    <nav>
      <router-link to="/" className="home-nav">
        <img
          id="nav-logo"
          src="https://cdn.dribbble.com/users/613796/screenshots/4916110/basket_ball_spin.gif"
        />
        <!-- <img
          id="nav-logo"
          src="https://st3.depositphotos.com/10544526/15154/v/600/depositphotos_151545494-stock-illustration-vector-image-basketball-on-fire.jpg"
        /> -->
      </router-link>
      <div class="right_nav">
        <router-link class="view_charts" to="/charts">
          <h3>View Charts</h3>
        </router-link>
        <router-link class="view_charts" to="/newchart" v-if="isSignedIn">
          <h3>Create Chart</h3>
        </router-link>
        <div className="user-nav-dropdown" v-if="isSignedIn">
          <div className="dropbtn">
            <img :src="currentUser.pfp" alt="pfp" />
          </div>
          <div className="dropdown-content">
            <!-- <Link
                    to={'/profile'}
                    className="user-profile"
                    onClick={() => setProfile(true)}
                  >
                    <h4>Profile</h4>
                  </Link> -->
            <div class="signout_nav" @click="handleSignOut">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              />
              <h4>Logout</h4>
            </div>
          </div>
        </div>
        <div id="GoogleSignIn-nav" v-if="!isSignedIn">
          <div
            class="google-sign-btn"
            id="google-nav"
            @click="handleSignInGoogle"
          >
            <img
              referrerpolicy="no-referrer"
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </nav>
  </header>
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
  name: 'NavBar',
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email,
      pfp: localStorage.pfp
    },
    isSignedIn: false,
    users: []
  }),
  mounted: async function () {
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
            let user_id = await createUser(body)
            localStorage.id = user_id.id
            location.reload()
            this.isSignedIn = true
          } else {
            let body = {
              name: result.user.displayName,
              email: result.user.email,
              pfp_url: result.user.photoURL
            }
            let user_id = await updateUser(id, body)
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
