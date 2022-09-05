<template>
  <NavBarVue :currentUser="currentUser" :isSignedIn="isSignedIn" />
  <main>
    <router-view header="Nba"></router-view>
  </main>
</template>

<script>
import NavBarVue from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBarVue
  },
  data() {
    return {
      currentUser: null,
      isSignedIn: false
    }
  }
}
</script>
